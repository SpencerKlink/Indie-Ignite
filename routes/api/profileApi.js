// routes/api/profileApi.js
const express = require('express');
const multer = require('multer');
const axios = require('axios');
const router = express.Router();
const isAuthenticated = require('../../config/middleware/auth'); 
const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './public/uploads/'); 
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/random-image', async (req, res) => {
    console.log("Fetching Random Image")
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
    res.redirect(`/profile?image=${imageUrl}`); 
});

router.post('/update/:userId', isAuthenticated, async (req, res) => {
    const User = require('../../models/User'); 
    if (req.params.userId !== req.user.id.toString()) {
        return res.status(403).send('Unauthorized');
    }
    try {
        await User.updateOne({_id: req.params.userId}, {$set: req.body});
        res.redirect(`/profile/${req.params.userId}`);
    } catch (err) {
        res.status(500).send('Error updating profile: ' + err);
    }
});

module.exports = router;
