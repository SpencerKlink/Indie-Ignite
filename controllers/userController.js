// Handle user authentication and profile logic
const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if(!user || !user.checkPassword(password)) {
            res.status(400).json({ message: 'Incorrect username or password, please try again.' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.logged_in = true;

            res.json({ user, message: 'You are now logged in!' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
});

router.post('/logout', (req, res) => {
    if(req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});