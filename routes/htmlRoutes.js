const express = require('express');
const router = express.Router();
const isAuthenticated = require('../config/middleware/auth');
const User = require('../models/User'); // Ensure User model is correctly defined in your project

// Home page
router.get('/', (req, res) => {
    res.render('home', { layout: false });
});

// Login page
router.get('/login', (req, res) => {
    res.render('login', { layout: false });
});

// Profile for testing style
router.get('/profile', (req, res) => {
    res.render('profile', { layout: false });
});

router.get('/profileEdit', (req, res) => {
    res.render('profileEdit', { layout: false });
});


// // Profile viewing for any user
// router.get('/profile/:userId', (req, res) => {
//     User.findById(req.params.userId)
//         .then(userData => {
//             // Add a check to see if the user is viewing their own profile
//             const ownProfile = req.user && req.user.id.toString() === req.params.userId;
//             res.render('profile', { userData, ownProfile, layout: false });
//         })
//         .catch(error => {
//             res.status(500).send('Error occurred: ' + error);
//         });
// });

// // Profile editing for authenticated user
// router.get('/profile/edit/:userId', isAuthenticated, (req, res) => {
//     if (req.params.userId !== req.user.id.toString()) {
//         return res.status(403).send('Unauthorized');
//     }
//     User.findById(req.params.userId)
//         .then(userData => {
//             res.render('profile-edit', { userData, layout: false });
//         })
//         .catch(error => {
//             res.status(500).send('Error occurred: ' + error);
//         });
// });

// Game page
router.get('/game', (req, res) => {
    res.render('gamePage', { layout: false });
});

// router.get('*', (req, res) => {
//     res.render('home', { layout: false });
// });

module.exports = router;
