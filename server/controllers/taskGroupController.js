const TaskGroup = require('../models/TaskGroup');

const addTaskGroup = (directionId, name, description, callback) => {
    TaskGroup.addTaskGroup(directionId, name, description, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

const getAllTaskGroups = (callback) => {
    TaskGroup.getAllTaskGroups((err, taskGroups) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, taskGroups);
    });
};

module.exports = {
    addTaskGroup,
    getAllTaskGroups
};
