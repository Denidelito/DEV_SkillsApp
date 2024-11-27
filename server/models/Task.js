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
}

module.exports = Task;
