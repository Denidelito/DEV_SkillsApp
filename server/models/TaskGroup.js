const db = require('../config/db');

class TaskGroup {
    static addTaskGroup(directionId, name, description, callback) {
        const query = 'INSERT INTO task_groups (direction_id, name, description, created_at) VALUES (?, ?, ?, NOW())';
        db.query(query, [directionId, name, description], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    static getAllTaskGroups(callback) {
        const query = 'SELECT * FROM task_groups';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    static getTaskGroupsByDirection(directionId, callback) {
        const query = 'SELECT * FROM task_groups WHERE direction_id = ?';
        db.query(query, [directionId], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    static deleteTaskGroup(taskGroupId, callback) {
        const query = 'DELETE FROM task_groups WHERE id = ?';
        db.query(query, [taskGroupId], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
}

module.exports = TaskGroup;
