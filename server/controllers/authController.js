const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Авторизация пользователя
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
            if (user.role !== 'admin') {
                return res.status(400).json({ message: 'Role is not Admin'})
            }

            const isPasswordValid = await bcrypt.compare(password, user.password_hash);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid username or password' });
            }

            const token = jwt.sign(
                { userId: user.id, role: user.role },
                process.env.JWT_SECRET_KEY,
                { expiresIn: '1h' }
            );

            res.status(200).json({ message: 'Login successful', token });
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = { loginUser };
