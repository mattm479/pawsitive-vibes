    const router = require('express').Router();
const { Post, User} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    })
    res.status(200).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

router.get('/feed', withAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id);
    const posts = await Post.findAll({
      where: {
        category: user.favorite_animals
      },
      exclude: {
        user_id: req.session.user_id
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

module.exports = router;