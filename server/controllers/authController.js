const bcrypt = require('bcryptjs');
const db = require('../config/db');

// Функция для проверки пароля при аутентификации
const checkPassword = (username, password, callback) => {
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) return callback(err);

        if (results.length === 0) {
            return callback(null, false);
        }

        bcrypt.compare(password, results[0].password_hash, (err, isMatch) => {
            if (err) return callback(err);
            callback(null, isMatch ? results[0] : false);
        });
    });
};

module.exports = { checkPassword };
