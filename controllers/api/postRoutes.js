const router = require('express').Router();
const session = require('express-session');
const {Post} = require('../../models');

router.post('/', async (req, res) => {
try {
     const newPost = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
     })
     res.status(200).json(newPost);
} catch (error) {
   res.status(400)
   if(newPost) {
    res.status(400).json({ messege: 'no post found with id'});
    return;
   }}


})






module.exports = router