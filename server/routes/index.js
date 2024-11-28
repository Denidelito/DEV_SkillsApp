const express = require('express');

const directionRoutes = require('./api/directionRoutes');
const taskGroupRoutes = require('./api/taskGroupRoutes');
const taskRoutes = require('./api/taskRoutes');
const userRoutes = require('./api/userRoutes');
// const authRoutes = require('./authRoutes');

const router = express.Router();

router.use(directionRoutes);
router.use(taskGroupRoutes);
router.use(taskRoutes);
router.use(userRoutes);
// router.use(authRoutes);

module.exports = router;
