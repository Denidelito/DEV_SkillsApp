const db = require('../config/db');

class UserResults {
    static addUserResult(userId, taskGroupId, score, callback) {
        const query = 'INSERT INTO user_results (user_id, task_group_id, score, completed_at) VALUES (?, ?, ?, NOW())';
        db.query(query, [userId, taskGroupId, score], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    static getAllUserResults(callback) {
        const query = `
        SELECT 
            ur.id AS result_id,
            ur.score,
            ur.completed_at,
            u.username,
            u.role,
            tg.name AS task_group_name,
            d.name AS direction_name
        FROM 
            user_results ur
        JOIN 
            users u 
        ON 
            ur.user_id = u.id
        JOIN 
            task_groups tg 
        ON 
            ur.task_group_id = tg.id
        JOIN 
            directions d 
        ON 
            tg.direction_id = d.id`;

        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }


    static getUserResultsByUserId(userId, callback) {
        const query = `
        SELECT 
            ur.id, 
            ur.user_id, 
            ur.score, 
            ur.completed_at, 
            tg.name AS task_group_name
        FROM 
            user_results ur
        JOIN 
            task_groups tg 
        ON 
            ur.task_group_id = tg.id
        WHERE 
            ur.user_id = ?`;

        db.query(query, [userId], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }


    static deleteUserResultById(id, callback) {
        const query = 'DELETE FROM user_results WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    static updateUserResultById(id, newScore, callback) {
        const query = 'UPDATE user_results SET score = ?, completed_at = NOW() WHERE id = ?';
        db.query(query, [newScore, id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
}

module.exports = UserResults;
