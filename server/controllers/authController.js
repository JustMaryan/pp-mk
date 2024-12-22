const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

class AuthController {

  // Реєстрація користувача
  async register(req, res) {
    const { username, email, password } = req.body;

    try {
      // Провірка на коректність введених даних
      const existingUser = await User.findOne({ username });
      const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

      if (existingUser) {
        return res.status(400).json({ message: 'Користувач вже існує', error: 'userExists' });
      }
      if (specialCharRegex.test(username) || username.length < 4) {
        return res.status(400).json({ message: `Ім'я користувача не може містити (₴!"№;%:?*). Мінімальна ширина імені користувача 4 значення.`, error: 'usernameSymbol' });
      }
      if(password.length <= 5 || !password) {
        return res.status(400).json({ message: 'Ширина пароля мусить бути більше 5 символів.', error: 'passwordLength' });
      }
      if(!email) {
        return res.status(400).json({ message: 'Відсутня пошта.', error: 'missingMail' });
      }

      // Хешування пароля
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();

      // Генерація токена
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
      res.cookie('auth_token', token, { 
        httpOnly: true, 
        secure: true,
        maxAge: 6 * 24 * 60 * 60 * 1000,
        expires: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      });
      res.status(201).json({ message: `Користувач ${username} зареєстрований`});
    } catch (error) {
      res.status(500).json({ message: 'Помилка сервера', error: 'serverError' });
    }
  }

  // Авторизація користувача
  async login(req, res) {
    const { username, password } = req.body;

    try {
      // Пошук користувача
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: 'Користувача з таким іменем не знайдено', error:"incorrectName" });
      }

      // Перевірка пароля
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Невірний пароль', error:"incorrectPassword" });
      }

      // Генерація токена
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
      res.cookie('auth_token', token, { 
        httpOnly: true, 
        secure: true,
        maxAge: 6 * 24 * 60 * 60 * 1000,
        expires: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      });
      res.status(200).json({ message: 'Авторизація успішна' });
    } catch (error) {
      res.status(500).json({ message: 'Помилка сервера', error: 'serverError' });
    }
  }

  // Інформація про користувача
  async getUserData(req, res) {
    const userId = req.userId;

    try {
      const user = await User.findById(userId).select('username email age img');
      if (!user) {
        return res.status(404).json({ message: 'Користувача не знайдено', error:"notFind" });
      }

      const userData = {
        name: user.username,
        email: user.email,
      };

      if(user.age) userData.age = user.age;

      res.status(200).json(userData);
      
    } catch (error) {
      res.status(500).json({ message: 'Помилка сервера', error: 'serverError' });
    }
  }

  // Оновлення даних користувача
  async updateUserData(req, res) {
    const userId = req.userId;
    const { username, email, age } = req.body;
    console.log(req.body)

    try {      
      // Створюємо об'єкт оновлення, перевіряючи наявність значень
      const updateData = {};
      if (username) updateData.username = username;
      if (email) updateData.email = email;
      if (age !== undefined) updateData.age = age; // Якщо age передано (включаючи null)

      // Перевіряємо, чи є які-небудь дані для оновлення
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: 'Немає даних для оновлення', error:"noData" });
      }
      // Оновлюємо дані користувача в базі даних
      const user = await User.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true } // Повертає новий об'єкт користувача з оновленими даними
      );
    
      if (!user) {
        return res.status(404).json({ message: 'Користувача не знайдено', error:"notFind" });
      }
    
      // Повертаємо оновлені дані користувача
      res.status(200).json({ message:"Дані оновлено" });
    } catch (error) {
      res.status(500).json({ message: 'Помилка сервера', error: 'serverError' });
    }
  }

  // Видалення користувача
  async deleteUser(req, res) {
    const userId = req.userId;
  
    try {
      const user = await User.findByIdAndDelete(userId);

      if (!user) {
        return res.status(404).json({ message: 'Користувача не знайдено', error:"notFind" });
      }
  
      res.clearCookie('auth_token', { 
        httpOnly: true, 
        secure: true,
        maxAge: 6 * 24 * 60 * 60 * 1000,
        expires: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      });
      res.status(200).json({ message: 'Користувача успішно видалено' });
    } catch (error) {
      console.error('Помилка при видаленні користувача:', error);
      res.status(500).json({ message: 'Помилка сервера', error: 'serverError' });
    }
  }

  // Вихід користувача
  async logoutUser(req, res) {
    try {
      const token = req.cookies.auth_token;

      if (!token) {
        return res.status(400).json({ message: 'Користувач не авторизований або вже вийшов', error:"notFind" });
      }
      
      res.clearCookie('auth_token');
      res.status(200).json({ message: 'Користувача успішно вийшов'});
    } catch (error) {
      res.status(500).json({ message: 'Помилка сервера', error: 'serverError' });
    }
  }

}

module.exports = new AuthController();
