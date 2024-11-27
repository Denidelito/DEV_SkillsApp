const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Регистрация пользователя
const register = (req, res) => {
    const { username, password, role = 'user' } = req.body;

    User.findUserByUsername(username, (err, existingUser) => {
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        User.addUser(username, password, role, (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error creating user', error: err });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
};

// Авторизация пользователя (вход)
const login = (req, res) => {
    const { username, password } = req.body;

    User.findUserByUsername(username, (err, user) => {
        if (err || !user) {
            return res.status(404).json({ message: 'User not found' });
        }

        bcrypt.compare(password, user.password_hash, (err, isMatch) => {
            if (err || !isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ userId: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({ message: 'Login successful', token });
        });
    });
};

module.exports = { register, login };
