const UserResults = require('../models/UserResults');

const addUserResult = (userId, taskGroupId, score, callback) => {
    UserResults.addUserResult(userId, taskGroupId, score, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

const getAllUserResults = (callback) => {
    UserResults.getAllUserResults((err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

const getUserResultsByUserId = (userId, callback) => {
    UserResults.getUserResultsByUserId(userId, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

const deleteUserResultById = (id, callback) => {
    UserResults.deleteUserResultById(id, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

const updateUserResultById = (id, newScore, callback) => {
    UserResults.updateUserResultById(id, newScore, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

module.exports = {
    addUserResult,
    getAllUserResults,
    getUserResultsByUserId,
    deleteUserResultById,
    updateUserResultById
};