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
}

module.exports = TaskGroup;
