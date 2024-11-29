const Direction = require('../models/Direction');

const addDirection = (name, description, callback) => {
    Direction.addDirection(name, description)
        .then((results) => {
            callback(null, results);
        })
        .catch((err) => {
            callback(err, null);
        });
};

const getAllDirections = (callback) => {
    Direction.getAllDirections()
        .then((directions) => {
            callback(null, directions);
        })
        .catch((err) => {
            callback(err, null);
        });
};

const deleteDirection = (id, callback) => {
    Direction.deleteDirection(id)
        .then((results) => {
            callback(null, results);
        })
        .catch((err) => {
            callback(err, null);
        });
};

module.exports = {
    addDirection,
    getAllDirections,
    deleteDirection
};
