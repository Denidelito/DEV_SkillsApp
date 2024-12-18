const express = require('express');
const router = express.Router();
const { addUser, getAllUsers, deleteUser } = require('../../controllers/userController');

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
        await addUser(username, password !== null ? password : '111', role, (err, results) => {
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

// Маршрут для удаления пользователя
router.delete('/users/:id', (req, res) => {
    const userId = req.params.id;

    deleteUser(userId, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting user', error: err });
        }
        res.status(200).json({ message: 'User deleted successfully', affectedRows: results.affectedRows });
    });
});

module.exports = router;