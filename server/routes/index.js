const express = require('express');

const directionRoutes = require('./directionRoutes');
const taskGroupRoutes = require('./taskGroupRoutes');
const taskRoutes = require('./taskRoutes');
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');

const router = express.Router();

router.use('/api', directionRoutes);
router.use('/api',taskGroupRoutes);
router.use('/api',taskRoutes);
router.use('/api',userRoutes);
router.use('/api', authRoutes);

module.exports = router;
