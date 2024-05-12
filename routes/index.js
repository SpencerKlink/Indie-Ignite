// Main route file that imports all other route modules
const express = require('express');
const router = express.Router();

const htmlRoutes = require('./htmlRoutes');
const apiRoutes = require('./api'); 

// Use the specific routers
router.use('/', htmlRoutes);  
router.use('/api', apiRoutes);



module.exports = router;
