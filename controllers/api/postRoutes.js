const router = require('express').Router();
const { Post, User} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user.id,
    })
    res.status(200).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
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

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

router.get('/feed/:user_id', withAuth, async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: {
        user_id: req.params.user.id
      },
      include: {
        model: User,
        attributes: ['username'],
      }
    });

    if (!posts) {
      res.status(404).json('No posts found');
    }

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

module.exports = router