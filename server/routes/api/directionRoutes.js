const express = require('express');
const router = express.Router();
const { addDirection, getAllDirections } = require('../../controllers/directionController');

// Маршрут для добавления нового направления
router.post('/directions', (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: 'Name and description are required' });
    }

    addDirection(name, description, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error adding direction', error: err });
        }
        res.status(201).json({ message: 'Direction added successfully', directionId: results.insertId });
    });
});

// Маршрут для получения всех направлений
router.get('/directions', (req, res) => {
    getAllDirections((err, directions) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching directions', error: err });
        }
        res.status(200).json(directions);
    });
});

module.exports = router;
