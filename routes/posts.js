const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Post } = require('../models');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Endpoint to create a post
router.post('/api/posts', upload.single('post-media'), async (req, res) => {
    try {
        console.log('Session user ID:', req.session.userID); // Log user ID
        const { content } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
        const userId = req.session.userId; // Ensure this is set correctly

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const newPost = await Post.create({
            userId,
            content,
            imageUrl
        });

        res.status(201).json(newPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create post' });
    }
});

module.exports = router;
