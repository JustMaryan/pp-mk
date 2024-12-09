const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const JWT_SECRET = 'my_secret_key_2000_mk';

const verifyToken = async (req, res, next) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({ message: 'Неавторизований користувач.', error:"unauthorizedUser" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'Користувача не знайдено.', error:"notFind" });
    }

    req.userId = user.id;
    next();
  } catch (error) {
    console.error('Помилка перевірки токена:', error);
    res.status(401).json({ message: 'Невалідний токен', error: 'oldData' });
  }
};

module.exports = verifyToken;
