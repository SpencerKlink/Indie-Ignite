const express = require('express');
const router = express.Router();
const withAuth = require('../config/middleware/auth')

router.get('/', withAuth, (req, res) => {
    res.render('home'), { layout: false };  
});

router.get('/login', (req, res) => {
    res.render('login', { layout: false });  
});

router.get('*', withAuth, (req, res) => {
    res.render('home'), { layout: false };  
});

module.exports = router;