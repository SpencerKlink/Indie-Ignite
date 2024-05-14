const express = require('express');
const multer = require('multer');
const router = express.Router();
const isAuthenticated = require('../../config/middleware/auth'); 

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './public/uploads/'); 
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/upload-photo', upload.single('profileImage'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const imageUrl = '/uploads/' + req.file.filename;
    updateUserProfileImage(req.session.userId, imageUrl)
        .then(() => res.redirect('/profile'))
        .catch(error => res.status(500).send('Error updating profile image: ' + error.message));
});

router.post('/update/:userId', isAuthenticated, (req, res) => {
    const User = require('../../models/User'); 
    if (req.params.userId !== req.user.id.toString()) {
        return res.status(403).send('Unauthorized');
    }
    User.updateOne({_id: req.params.userId}, {$set: req.body}, function(err, result) {
        if (err) {
            return res.status(500).send('Error updating profile: ' + err);
        }
        res.redirect(`/profile/${req.params.userId}`);
    });
});

module.exports = router;

module.exports = router;
