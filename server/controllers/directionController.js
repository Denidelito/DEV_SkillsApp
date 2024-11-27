const Direction = require('../models/Direction');

// Функция для добавления нового направления
const addDirection = (name, description, callback) => {
    Direction.addDirection(name, description)
        .then((results) => {
            callback(null, results);
        })
        .catch((err) => {
            callback(err, null);
        });
};

// Функция для получения всех направлений
const getAllDirections = (callback) => {
    Direction.getAllDirections()
        .then((directions) => {
            callback(null, directions);
        })
        .catch((err) => {
            callback(err, null);
        });
};

module.exports = {
    addDirection,
    getAllDirections
};
