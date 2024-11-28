const express = require('express');
const router = express.Router();
const { addTaskGroup, getAllTaskGroups } = require('../../controllers/taskGroupController');

router.post('/task_groups', (req, res) => {
    const { direction_id, name, description } = req.body;
    if (!direction_id || !name || !description) {
        return res.status(400).json({ message: 'Direction ID, name and description are required' });
    }

    addTaskGroup(direction_id, name, description, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error adding task group', error: err });
        }
        res.status(201).json({ message: 'Task group added successfully', taskGroupId: results.insertId });
    });
});

router.get('/task_groups', (req, res) => {
    getAllTaskGroups((err, taskGroups) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching task groups', error: err });
        }
        res.status(200).json(taskGroups);
    });
});

module.exports = router;
