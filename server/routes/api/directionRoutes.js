const express = require('express');
const router = express.Router();
const { addDirection, getAllDirections, deleteDirection } = require('../../controllers/directionController');

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

router.get('/directions', (req, res) => {
    getAllDirections((err, directions) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching directions', error: err });
        }
        res.status(200).json(directions);
    });
});

router.delete('/directions/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Direction ID is required' });
    }

    deleteDirection(id, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting direction', error: err });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Direction not found' });
        }

        res.status(200).json({ message: 'Direction deleted successfully' });
    });
});

module.exports = router;
