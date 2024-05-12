const express = require('express');
const router = express.Router();
const { User } = require('../../models'); 
const bcrypt = require('bcrypt');


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
router.post('/signup', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            userRole : req.body.userRole,
            password: await bcrypt.hash(req.body.password, 10)
        });

        req.session.save(() => {
            req.session.userId = newUser.id;
            req.session.username = newUser.username;
            req.session.loggedIn = true;

            res.status(201).json(newUser);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// POST route for user login
router.post('/login', async (req, res) => {
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

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            req.session.userId = user.id;
            req.session.username = user.username;
            req.session.userRole = user.userRole;
            req.session.loggedIn = true;

            res.json({ user: user, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// POST route for user logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
