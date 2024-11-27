const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching users', error: err });
        }
        res.status(200).json(results);
    });
});

router.post('/users', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required' });
    }

    db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating user', error: err });
        }
        res.status(201).json({ message: 'User created', userId: results.insertId });
    });
});

router.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting user', error: err });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted' });
    });
});

module.exports = router;
