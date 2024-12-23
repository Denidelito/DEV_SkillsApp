const express = require('express');
const router = express.Router();
const UserResultsController = require('../../controllers/userResult');

// Добавление нового результата
router.post('/userResults/add', (req, res) => {
    const { userId, taskGroupId, score } = req.body;

    console.log(userId, taskGroupId, score)
    UserResultsController.addUserResult(userId, taskGroupId, score, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'User result added successfully', result });
    });
});

// Получение всех результатов
router.get('/userResults/all', (req, res) => {
    UserResultsController.getAllUserResults((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

// Получение результатов по user_id
router.get('/userResults/user/:userId', (req, res) => {
    const userId = req.params.userId;

    UserResultsController.getUserResultsByUserId(userId, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

// Удаление результата по id
router.delete('/userResults/:id', (req, res) => {
    const id = req.params.id;
    UserResultsController.deleteUserResultById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'User result deleted successfully', result });
    });
});

// Обновление результата пользователя по id
router.put('/userResults/:id', (req, res) => {
    const id = req.params.id;
    const { newScore } = req.body;
    UserResultsController.updateUserResultById(id, newScore, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'User result updated successfully', result });
    });
});

module.exports = router;