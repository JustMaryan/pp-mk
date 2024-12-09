const mongoose = require('mongoose');

// Модель користувача для MongoDB
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: String, default: null }, 
    img: { type: String, default: null },   
    type: {type: String, default: 'user'}
});


const User = mongoose.model('User', userSchema);

module.exports = User;
