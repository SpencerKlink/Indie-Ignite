const express = require('express');
const multer = require('multer');
const router = express.Router();

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

module.exports = router;
