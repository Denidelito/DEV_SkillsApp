const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
    static async addUser(username, password, role, callback) {
        try {
            if (role === 'admin') {
                if (!password) {
                    throw new Error('Password is required for admin role');
                }
            } else if (role === 'user') {
                password = '1111';
            } else {
                throw new Error('Invalid role specified');
            }

            let passwordHash = null;

            if (password) {
                const saltRounds = 10;
                passwordHash = await bcrypt.hash(password, saltRounds);
            }

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


    static getAllUsers(callback) {
        const query = 'SELECT id, username, role, created_at FROM users';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

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

    static async checkPassword(enteredPassword, storedHash) {
        return bcrypt.compare(enteredPassword, storedHash);
    }
}

module.exports = User;
