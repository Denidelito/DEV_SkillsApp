const express = require('express');
const router = express.Router();
const { addUser, getAllUsers } = require('../../controllers/userController');

// Маршрут для добавления нового пользователя
router.post('/users', async (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !role) {
        return res.status(400).json({ message: 'Username and role are required' });
    }

    if (role !== 'user' && !password) {
        return res.status(400).json({ message: 'Password is required for roles other than "users"' });
    }

    try {
        await addUser(username, password || null, role, (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error adding user', error: err });
            }
            res.status(201).json({ message: 'User added successfully', userId: results.insertId });
        });
    } catch (err) {
        res.status(500).json({ message: 'Error processing request', error: err });
    }
});

// Маршрут для получения всех пользователей
router.get('/users', (req, res) => {
    getAllUsers((err, users) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching users', error: err });
        }
        res.status(200).json(users);
    });
});

module.exports = router;