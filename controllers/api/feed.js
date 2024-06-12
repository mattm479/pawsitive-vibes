const router = require('express').Router();
const { Post, User } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: {
                model: User,
                attributes: ['username'],
            },
        });
        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to get posts' });
    }
});

module.exports = router;
