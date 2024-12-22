const mongoose = require('mongoose');

// Модель користувача для MongoDB
const termStore = new mongoose.Schema({
    outUserId: { type: String, required: true },
    store: { type: Object, required: true },
});


const TermStore = mongoose.model('termStore', termStore);

module.exports = TermStore;
