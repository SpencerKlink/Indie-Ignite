// routes/api/profileApi.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const axios = require('axios');
const router = express.Router();
const isAuthenticated = require('../../config/middleware/auth');
const { User } = require('../../models');
const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/random-image', async (req, res) => {
    console.log("Fetching Random Image");
    try {
        const response = await axios.get(`https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&query=portrait`);
        const imageUrl = response.data.urls.regular;
        res.json({ imageUrl });
    } catch (error) {
        console.error('Error fetching random image from Unsplash:', error);
        res.status(500).json({ message: 'Failed to fetch image', error });
    }
});

router.post('/upload-photo', upload.single('profileImage'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const imageUrl = '/uploads/' + req.file.filename;
    res.redirect(`/profileEdit?image=${imageUrl}`);
});

router.post('/update/:userId', isAuthenticated, upload.single('profileImage'), async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        if (req.file) {
            user.profile_picture = '/uploads/' + req.file.filename;
        } else if (req.body.profileImageUrl) {
            user.profile_picture = req.body.profileImageUrl;
        }

        user.username = req.body.username || user.username;
        user.about_me = req.body.about_me || user.about_me;

        await user.save();

        res.redirect(`/profile/${req.params.userId}`);
    } catch (err) {
        console.error('Error updating profile:', err);
        res.status(500).send('Error updating profile: ' + err.message);
    }
});

module.exports = router;
