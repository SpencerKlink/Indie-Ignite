const express = require('express');
// const router = express('express').Router();
const publicGameRoutes = require('./publicGameRoutes');  
const adminGameRoutes = require('./adminGameRoutes');  
const { findAll } = require('../../models/Game');
const app = express('express');

router.use('/public', publicGameRoutes);
router.use('/admin', adminGameRoutes);





router.get('/games', async (req, res) => {
    try {
    // Search the database for a dish with an id that matches params
    const gameData = await findAll();
    // console.log(dishData) // unserialized
    // We use .get({ plain: true }) on the object to serialize it so that it only includes the data that we need. 
    const game= gameData.get({ plain: true });
    console.log({serializedData: game})
    // Then, the 'dish' template is rendered and dish is passed into the template.
    res.render('games', game);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
