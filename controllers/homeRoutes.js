const withAuth = require('../utils/auth');
const { Post, User } = require('../models');
const { Op } = require('sequelize');
const router = require('express').Router();

// Home Route
router.get('/', async (req, res) => {
  try {
    res.render('login', { user: req.session.user });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login Route
router.get('/login', (req, res) => {
  if (req.session.user) {
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
      order: [
        ['createdAt', 'DESC']
      ],
    });

    if (!posts) {
      res.status(404).json('No posts found');
      return;
    }

    const postData = posts.map(post => post.get({ plain: true }));

    res.render('feed', { posts: postData });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

router.get('/profile', withAuth, async (req, res)=> {
  const posts = await Post.findAll({
    where: {
      user_id: req.session.user.id
    }
  });

  const postData = posts.map(post => post.get({ plain: true }));

  res.render('profile', {
    posts: postData,
    user: req.session.user
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.render('login');
});

module.exports = router;
