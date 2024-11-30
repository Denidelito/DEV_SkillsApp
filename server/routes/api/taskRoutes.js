const express = require('express');
const router = express.Router();
const { addTask, getAllTasks, getTasksByGroupId } = require('../../controllers/taskController');

router.post('/tasks', (req, res) => {
    const { task_group_id, task_data, admin_id } = req.body;
    if (!task_group_id || !task_data || !admin_id) {
        return res.status(400).json({ message: 'Task group ID, task data, and admin ID are required' });
    }

    addTask(task_group_id, task_data, admin_id, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error adding task', error: err });
        }
        res.status(201).json({ message: 'Task added successfully', taskId: results.insertId });
    });
});

router.get('/tasks', (req, res) => {
    getAllTasks((err, tasks) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching tasks', error: err });
        }
        res.status(200).json(tasks);
    });
});

router.get('/tasks/group/:task_group_id', (req, res) => {
    const { task_group_id } = req.params;
    if (!task_group_id) {
        return res.status(400).json({ message: 'Task group ID is required' });
    }

    getTasksByGroupId(task_group_id, (err, tasks) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching tasks by group', error: err });
        }
        res.status(200).json(tasks);
    });
});

module.exports = router;
