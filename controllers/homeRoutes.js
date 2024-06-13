const router = require('express').Router();
const { Post, User } = require('../models');

// Home Route
router.get('/', async (req, res) => {
  try {
    res.render('homepage', { user: req.session.user });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Feed Route
router.get('/feed', async (req, res) => {
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
router.get('/profile', async (req, res) => {
  try {
    if (!req.session.user_id) {
      console.log('User not logged in');
      res.redirect('/login');
      return;
    }
    console.log('Session User ID:', req.session.user_id);
    const user = await User.findByPk(req.session.user_id, {
      include: [{ model: Post }]
    });
    if (!user) {
      console.log('No user found with this id');
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    const userData = user.get({ plain: true });

    console.log('User data:', userData);

    res.render('profile', {
      user: userData
    });
  } catch (err) {
    console.log('Error:', err);
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

module.exports = router;
