const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    res.render('login', { user: req.session.user });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.user) {
    res.redirect('/feed');
  }

  res.render('homepage');
});

router.get('/signup', (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
