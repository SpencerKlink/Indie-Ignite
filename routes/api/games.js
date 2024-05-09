const express = require('express');
const router = express.Router();
const publicGameRoutes = require('./publicGameRoutes');  
const adminGameRoutes = require('./adminGameRoutes');  

router.use('/public', publicGameRoutes);
router.use('/admin', adminGameRoutes);

module.exports = router;
