const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Авторизация
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        User.getUserByUsername(username, async (err, user) => {
            if (err) {
                return res.status(500).json({ message: 'Server error', error: err.message });
            }

            if (!user) {
                return res.status(400).json({ message: 'Invalid username or password' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password_hash);

            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid username or password' });
            }

            // Генерация токена
            const token = jwt.sign(
                { userId: user.id, role: user.role },
                process.env.JWT_SECRET_KEY,
                { expiresIn: '1h' }
            );

            if (user.role === 'admin') {
                return res.status(200).json({ message: 'Admin login successful', token, role: 'admin' });
            } else if (user.role === 'user') {
                return res.status(200).json({ message: 'User login successful', token, role: 'user', username: username, userId: user.id });
            } else {
                return res.status(403).json({ message: 'Access denied: Invalid role' });
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = { loginUser };
