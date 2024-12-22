const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const TermAppController = require('../controllers/termAppController');
const router = express.Router();


router.post('/term/save', verifyToken, TermAppController.saveData);
router.get('/term/load', verifyToken, TermAppController.loadData);


module.exports = router;