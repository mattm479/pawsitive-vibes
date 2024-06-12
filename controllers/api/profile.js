const router = require('express').Router();
const { User, Post } = require('../../models');

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: {
                model: Post,
                attributes: ['id', 'content', 'imageUrl', 'createdAt'],
            },
        });

        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to get user profile' });
    }
});

module.exports = router;
