const express = require('express');
const router = express.Router();
const { User } = require('../../models'); 
const bcrypt = require('bcrypt');
const preventDuplicateSession = require('../../config/middleware/currentSession.js');


router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        console.log("All users hit")

        res.json(userData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// POST route for user signup
router.post('/signup',preventDuplicateSession, async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            userRole : req.body.userRole,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.userId = newUser.id;
            req.session.username = newUser.username;
            req.session.logged_In = true;

            res.status(201).json(newUser);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// POST route for user login
router.post('/login',preventDuplicateSession, async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (!user) {
            res.status(400).json({ message: 'No user found with that email address!' });
            return;
        }
        const validPassword = await user.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        req.session.save(() => {
            req.session.userId = user.id;
            req.session.username = user.username;
            req.session.userRole = user.userRole;
            req.session.logged_In = true;

            res.json({ user: user, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_In) {
        req.session.destroy(err => {
            if (err) {
                res.status(500).json({ message: 'Could not log out, please try again' });
            } else {
                res.redirect('/login');
            }
        });
    } else {
        res.status(404).send('Not logged in');
    }
});



router.put('/profile/:id', async (req, res) => {
    try {
        const userData = await User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        });

        if (!userData[0]) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const userData = await User.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
