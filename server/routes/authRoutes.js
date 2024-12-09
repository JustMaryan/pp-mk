const express = require('express');
const AuthController = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

// Реєстрація
router.post('/profile/register', AuthController.register);

// Авторизація
router.post('/profile/login', AuthController.login);

// Отримання даних користувача
router.get('/profile/info', verifyToken, AuthController.getUserData);

// Оновлення даних користувача
router.put('/profile/update', verifyToken, AuthController.updateUserData); 

// Видалення користувача
router.delete('/profile/delete', verifyToken, AuthController.deleteUser); 

// Вихід користувача
router.post('/profile/logout', AuthController.logoutUser);

module.exports = router;
