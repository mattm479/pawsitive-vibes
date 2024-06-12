const express = require('express');
const router = express.Router();

router.get('/feed', (req, res) => {
    res.render('feed', { title: 'Feed - Pawsitive Vibes' });
});

module.exports = router;
