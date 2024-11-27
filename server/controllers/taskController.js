const Task = require('../models/Task');

const addTask = (taskGroupId, taskData, adminId, callback) => {
    Task.addTask(taskGroupId, taskData, adminId, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

const getAllTasks = (callback) => {
    Task.getAllTasks((err, tasks) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, tasks);
    });
};

const getTasksByGroupId = (taskGroupId, callback) => {
    Task.getTasksByGroupId(taskGroupId, (err, tasks) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, tasks);
    });
};

module.exports = {
    addTask,
    getAllTasks,
    getTasksByGroupId
};
