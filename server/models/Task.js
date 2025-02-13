const db = require('../config/db');

class Task {
    static addTask(taskGroupId, taskData, adminId, callback) {
        const query = 'INSERT INTO tasks (task_group_id, task_data, admin_id, created_at) VALUES (?, ?, ?, NOW())';
        db.query(query, [taskGroupId, taskData, adminId], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    static getAllTasks(callback) {
        const query = 'SELECT * FROM tasks';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    static getTasksByGroupId(taskGroupId, callback) {
        const query = 'SELECT * FROM tasks WHERE task_group_id = ?';
        db.query(query, [taskGroupId], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    static deleteTaskById(taskId, callback) {
        const query = 'DELETE FROM tasks WHERE id = ?';
        db.query(query, [taskId], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    static updateTaskById(taskId, updatedTaskData, callback) {
        const query = 'UPDATE tasks SET task_data = ?, updated_at = NOW() WHERE id = ?';
        db.query(query, [updatedTaskData, taskId], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
}

module.exports = Task;
