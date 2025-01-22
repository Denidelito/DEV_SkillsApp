const UserResults = require('../models/UserResults');

const addUserResult = (req, res) => {
    const { userId, taskGroupId, score } = req.body;
    UserResults.addUserResult(userId, taskGroupId, score, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Ошибка добавления результата пользователя', details: err });
        }
        res.status(201).json({ message: 'Результат успешно добавлен', data: results });
    });
};

const getAllUserResults = (req, res) => {
    UserResults.getAllUserResults((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Ошибка получения результатов', details: err });
        }
        res.status(200).json({ message: 'Список результатов', data: results });
    });
};

const getUserResultsByUserId = (req, res) => {
    const { userId } = req.params;
    UserResults.getUserResultsByUserId(userId, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Ошибка получения результатов пользователя', details: err });
        }
        res.status(200).json({ message: 'Результаты пользователя', data: results });
    });
};

const deleteUserResultById = (req, res) => {
    const { id } = req.params;
    UserResults.deleteUserResultById(id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Ошибка удаления результата', details: err });
        }
        res.status(200).json({ message: 'Результат успешно удалён', data: results });
    });
};

const updateUserResultById = (req, res) => {
    const { id } = req.params;
    const { newScore } = req.body;
    UserResults.updateUserResultById(id, newScore, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Ошибка обновления результата', details: err });
        }
        res.status(200).json({ message: 'Результат успешно обновлён', data: results });
    });
};

module.exports = {
    addUserResult,
    getAllUserResults,
    getUserResultsByUserId,
    deleteUserResultById,
    updateUserResultById
};
