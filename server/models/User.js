const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
    // Добавить нового пользователя с хэшированием пароля
    static async addUser(username, password, role, callback) {
        try {
            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(password, saltRounds);
            const query = 'INSERT INTO users (username, password_hash, role, created_at) VALUES (?, ?, ?, NOW())';
            db.query(query, [username, passwordHash, role], (err, results) => {
                if (err) {
                    return callback(err, null);
                }
                callback(null, results);
            });
        } catch (err) {
            callback(err, null);
        }
    }

    // Получить всех пользователей (без паролей)
    static getAllUsers(callback) {
        const query = 'SELECT id, username, role, created_at FROM users';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    // Получить пользователя по имени
    static getUserByUsername(username, callback) {
        const query = 'SELECT id, username, password_hash, role, created_at FROM users WHERE username = ?';
        db.query(query, [username], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            if (results.length === 0) {
                return callback(null, null);
            }
            callback(null, results[0]);
        });
    }

    // Проверить пароль пользователя
    static async checkPassword(enteredPassword, storedHash) {
        return bcrypt.compare(enteredPassword, storedHash);
    }
}

module.exports = User;
