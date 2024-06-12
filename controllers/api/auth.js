const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

// Register route
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, favorite_animals } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            favorite_animals,
            created_at: new Date(),
            updated_at: new Date(),
        });

        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred during registration' });
    }
});

module.exports = router;
