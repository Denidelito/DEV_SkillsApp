const express = require('express');

const directionRoutes = require('./directionRoutes');
const taskGroupRoutes = require('./taskGroupRoutes');
const taskRoutes = require('./taskRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();

router.use(directionRoutes);
router.use(taskGroupRoutes);
router.use(taskRoutes);
router.use(userRoutes);

module.exports = router;
