const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
     const Userdata = await User.create(req.body)

    }

   catch (error) {
    
  }





})




module.exports = router