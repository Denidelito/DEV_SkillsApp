const express = require('express');
const router = express.Router();
const { addTask, getAllTasks, getTasksByGroupId, deleteTaskById, updateTaskById } = require('../../controllers/taskController');

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

router.delete('/tasks/:task_id', (req, res) => {
    const { task_id } = req.params;
    if (!task_id) {
        return res.status(400).json({ message: 'Task ID is required' });
    }

    deleteTaskById(task_id, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting task', error: err });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    });
});

router.put('/tasks/:task_id', (req, res) => {
    const { task_id } = req.params;
    const { task_data } = req.body;

    if (!task_id || !task_data) {
        return res.status(400).json({ message: 'Task ID and updated task data are required' });
    }

    updateTaskById(task_id, task_data, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating task', error: err });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task updated successfully' });
    });
});

module.exports = router;