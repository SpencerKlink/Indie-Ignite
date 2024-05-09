const express = require('express');
const router = express.Router();

const userRoutes = require('../routes/api/users');
const gameRoutes = require('../routes/api/reviews');
const reviewRoutes = require('../routes/api/reviews');

router.use('/users', userRoutes);
router.use('/games', gameRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;
