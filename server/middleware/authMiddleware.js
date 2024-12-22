const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();


const verifyToken = async (req, res, next) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({ message: 'Неавторизований користувач.', type:"unauthorizedUser" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'Користувача не знайдено.', type:"notFind" });
    }

    req.userId = user.id;
    next();
  } catch (error) {
    console.error('Помилка перевірки токена:', error);
    res.status(401).json({ message: 'Невалідний токен', type: 'oldData' });
  }
};

module.exports = verifyToken;
