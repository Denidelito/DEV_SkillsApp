const express = require('express');
const router = express.Router();
const { addTaskGroup, getAllTaskGroups, getTaskGroupsByDirection, deleteTaskGroup } = require('../../controllers/taskGroupController');

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

router.get('/task_groups/direction/:directionId', (req, res) => {
    const { directionId } = req.params;

    getTaskGroupsByDirection(directionId, (err, taskGroups) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching task groups by direction', error: err });
        }
        res.status(200).json(taskGroups);
    });
});

router.delete('/task_groups/:taskGroupId', (req, res) => {
    const { taskGroupId } = req.params;

    deleteTaskGroup(taskGroupId, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting task group', error: err });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Task group not found' });
        }
        res.status(200).json({ message: 'Task group deleted successfully' });
    });
});

module.exports = router;
