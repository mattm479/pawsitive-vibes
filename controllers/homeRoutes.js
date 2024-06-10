const { User } = require('../models');
const router = require('express').Router();
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
  try {
    res.render('homepage', { logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/feed');
  }

  res.render('homepage');
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user) {
      res.status(401).json('Invalid Username/Password');
      return;
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    req.body.password = "";

    if (!isValidPassword) {
      res.status(401).json('Invalid Username/Password');
      return;
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;

      res.status(200).json({ user: user, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/signup', (req, res) => {
  try {

  } catch (err) {

  }
});

module.exports = router;
