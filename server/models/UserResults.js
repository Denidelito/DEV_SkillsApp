const db = require('../config/db');

class UserResults {
    // Добавление записи о результате пользователя
    static addUserResult(userId, taskGroupId, score, callback) {
        const query = 'INSERT INTO user_results (user_id, task_group_id, score, completed_at) VALUES (?, ?, ?, NOW())';
        db.query(query, [userId, taskGroupId, score], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    // Получение всех результатов
    static getAllUserResults(callback) {
        const query = 'SELECT * FROM user_results';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    // Получение результатов по user_id
    static getUserResultsByUserId(userId, callback) {
        const query = 'SELECT * FROM user_results WHERE user_id = ?';
        db.query(query, [userId], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    // Удаление записи по id
    static deleteUserResultById(id, callback) {
        const query = 'DELETE FROM user_results WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    // Обновление результата пользователя
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
