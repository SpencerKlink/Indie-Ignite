const express = require('express');
const router = express.Router();
const publicGameRoutes = require('./publicGameRoutespublicGameRoutes');  
const adminGameRoutes = require('./adminGameRoutesadminGameRoutes');  
router.use('/public', publicGameRoutes);
router.use('/admin', adminGameRoutes);

module.exports = router;
