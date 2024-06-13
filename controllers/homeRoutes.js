const withAuth = require('../utils/auth');
const { Post, User } = require('../models');
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
