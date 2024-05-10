const express = require('express');
const router = express.Router();
// const isAuth = require('../config/middleware/auth')

router.get('/', (req, res) => {
    res.render('home'), { layout: false };  
});

router.get('/login', (req, res) => {
    res.render('login', { layout: false });  
});

router.get('*', (req, res) => {
    res.render('home'), { layout: false };  
});

router.get('/profile', (req, res) => {
    res.render('profile'), { layout: false };  
});

module.exports = router;