const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); 

// Налаштування серверу
const app = express();
const PORT = 3000;
const db = 'mongodb+srv://JustMaryan:Maryan159753@myserver.hkwny.mongodb.net/myServer?retryWrites=true&w=majority&appName=MyServer';

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://192.168.0.108:3000', // Список дозволених доменів
    methods: ['GET', 'POST',  'PUT', 'DELETE'], // Дозволені методи
    credentials: true // Дозвіл на передачу cookies
  }));

app.use(express.json());
app.use(cookieParser());

// Підключення до MongoDB
async function start() {
    try {
        await mongoose.connect(db);
        console.log("Підключення до MongoDB успішне");
    } catch (err) {
        console.log("Помилка підключення до MongoDB:", err);
    }

    // Маршрути для API   
    app.use(authRoutes); 

    // Статичні файли
    app.use(express.static(path.resolve(__dirname, '..', 'client')));

    // Запуск сервера
    app.listen(PORT, (error) => {
        if (error) {
            console.error("Помилка при запуску сервера:", error);
        } else {
            console.log(`Listening on port ${PORT}`);
        }
    });
}

// Викликаємо функцію для запуску
start();
