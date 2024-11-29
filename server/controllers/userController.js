const User = require('../models/User');

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

const getAllUsers = (callback) => {
    User.getAllUsers((err, users) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, users);
    });
};

const deleteUser = (userId, callback) => {
    User.deleteUser(userId, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

module.exports = {
    addUser,
    getAllUsers,
    deleteUser
};
