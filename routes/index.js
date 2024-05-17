const express = require('express');
const router = express.Router();

const { router: htmlRouter } = require('./htmlRoutes'); 
const apiRoutes = require('./api'); 

// Use the specific routers  
router.use('/', htmlRouter);  
router.use('/api', apiRoutes);

module.exports = router;
