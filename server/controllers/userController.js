const User = require('../models/User');

// Добавить нового пользователя
const addUser = async (username, password, role, callback) => {
    try {
        await User.addUser(username, password, role, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    } catch (err) {
        callback(err, null);
    }
};

// Получить всех пользователей
const getAllUsers = (callback) => {
    User.getAllUsers((err, users) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, users);
    });
};

module.exports = {
    addUser,
    getAllUsers
};
