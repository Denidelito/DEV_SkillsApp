const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/authController');

// Маршрут авторизации
router.post('/login', loginUser);

module.exports = router;
