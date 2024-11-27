const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching users', error: err });
        res.status(200).json(results);
    });
});

router.post('/users', (req, res) => {
    const { username, password } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: 'Error hashing password', error: err });

        db.query('INSERT INTO users (username, password_hash) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
            if (err) return res.status(500).json({ message: 'Error creating user', error: err });
            res.status(201).json({ message: 'User created', userId: results.insertId });
        });
    });
});

module.exports = router;
