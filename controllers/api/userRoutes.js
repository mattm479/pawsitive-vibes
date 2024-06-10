const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
     const Userdata = await User.create(req.body)

     req.session.save(() => {
        req.session.user_id = Userdata.id;
        req.session.logged_in = true;
        res.status(200).json(Userdata);
     });
    } catch (err) {
        res.status(400).json(err);
        if(User) {
            res.status(400).json()
        }
    }





})




module.exports = router