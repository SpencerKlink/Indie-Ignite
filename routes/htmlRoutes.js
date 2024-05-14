const express = require('express');
const router = express.Router();
const { Game, User } = require('../models');

// router.get('/', async (req, res) => {
//     try {
//         const gameData = await Game.findAll();

//         const games = gameData.map((game) => game.get({ plain: true }));

//         res.render('home', { games, layout: false });
//     } catch (error) {
//         console.error('Error getting games:', error);
//         res.status(500).json({ message: 'Failed to get games', error });
//     }
// });


// router.get('/profile', async (req, res) => {
//     const user = await User.findOne({
//         where: {
//             id: req.session.userId
//         },
//         include: [Game]
//     });
//     res.render('profile', { user, layout: false });
// });

// // Profile for testing style
// router.get('/profile', (req, res) => {
//     res.render('profile', { layout: false });
// });

// router.get('/profileEdit', (req, res) => {
//     res.render('profileEdit', { layout: false });
// });

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

router.get('/game', (req, res) => {
    res.render('gamePage', { layout: false });  
});

router.get('/profile', (req, res) => {
    res.render('profile', { layout: false });  
});

router.get('/profileEdit', (req, res) => {
    res.render('profileEdit', { layout: false });  
});

router.get('/', (req, res) => {
    res.render('home', { layout: false });  
});

// Login page
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login', { layout: false });
});

// GET route to retrieve a specific game by its ID and render the gamecard partial
router.get('/game/:id', async (req, res) => {
    try {
        const game = await Game.findByPk(req.params.id);
        res.render('gamecard', game);
    } catch (error) {
        console.error('Error getting game:', error);
        res.status(500).json({ message: 'Failed to get game', error });
    }
});

module.exports = router;
