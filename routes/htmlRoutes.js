const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home'), { layout: false };  
});

router.get('/login', (req, res) => {
    res.render('login', { layout: false });  
});

module.exports = router;