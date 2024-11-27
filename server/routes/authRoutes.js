const express = require('express');
const router = express.Router();
const { checkPassword } = require('../controllers/authController');

// Логин пользователя
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    checkPassword(username, password, (err, user) => {
        if (err) return res.status(500).json({ message: 'Error logging in', error: err });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        res.status(200).json({ message: 'Login successful', user });
    });
});

module.exports = router;
