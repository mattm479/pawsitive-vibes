const express = require('express');
const router = express.Router();

router.get('/profile/:id', (req, res) => {
    const userId = req.params.id; 
    res.render('profile', { title: 'Profile - Pawsitive Vibes', userId });
});

module.exports = router;
