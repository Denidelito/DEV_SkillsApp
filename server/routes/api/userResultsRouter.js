const express = require('express');
const router = express.Router();
const UserResultsController = require('../../controllers/userResult');

router.post('/userResults/add', (req, res) => {
    const { userId, taskGroupId, score } = req.body;

    if (!userId || !taskGroupId || typeof score === 'undefined') {
        return res.status(400).json({ error: 'Необходимо указать userId, taskGroupId и score' });
    }

    UserResultsController.addUserResult(req, res);
});

router.get('/userResults/all', (req, res) => {
    UserResultsController.getAllUserResults(req, res);
});

router.get('/userResults/user/:userId', (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ error: 'Не указан userId' });
    }

    UserResultsController.getUserResultsByUserId(req, res);
});

router.delete('/userResults/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Не указан id для удаления' });
    }

    UserResultsController.deleteUserResultById(req, res);
});

router.put('/userResults/:id', (req, res) => {
    const { id } = req.params;
    const { newScore } = req.body;

    if (!id || typeof newScore === 'undefined') {
        return res.status(400).json({ error: 'Необходимо указать id и newScore' });
    }

    UserResultsController.updateUserResultById(req, res);
});

module.exports = router;
