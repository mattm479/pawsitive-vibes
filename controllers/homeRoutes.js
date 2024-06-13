const withAuth = require('../utils/auth');
const { Post, User } = require('../models');
const router = require('express').Router();

// Home Route
router.get('/', async (req, res) => {
  try {
    res.render('login', { user: req.session.user });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Feed Route
router.get('/feed', withAuth, async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User }]
    });
    const postData = posts.map(post => post.get({ plain: true }));

    res.render('feed', {
      posts: postData,
      user: req.session.user
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Profile Route
router.get('/profile', withAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id, {
      include: [{ model: Post }]
    });
    if (!user) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    const userData = user.get({ plain: true });

    res.render('profile', {
      user: userData
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login Route
router.get('/login', (req, res) => {
  if (req.session.user_id) {
    res.redirect('/feed');
    return;
  }
  res.render('login');
});

// Signup Route
router.get('/signup', (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Logout Route
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.render('login');
});

module.exports = router;
