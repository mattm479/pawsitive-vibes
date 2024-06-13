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

router.get('/feed', withAuth, async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: {
        category: req.session.user.favorite_animals
      },
      include: {
        model: User,
        attributes: ['username'],
      },
      exclude: {
        user_id: req.session.user.id
      }
    });

    if (!posts) {
      res.status(404).json('No posts found');
    }

    res.render('feed', { posts });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

router.get('/profile', withAuth, (req, res)=> {
  res.render('profile', { user: req.session.user });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.render('login');
});

module.exports = router;
