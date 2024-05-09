const express = require('express');
const router = express.Router();
const publicGameRoutes = require('./spublicGameRoutes');  
const adminGameRoutes = require('./adminGameRoutes');  
router.use('/public', publicGameRoutes);
router.use('/admin', adminGameRoutes);

module.exports = router;
