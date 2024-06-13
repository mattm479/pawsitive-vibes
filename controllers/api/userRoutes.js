const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email
      }
    });

     if (!userData) {
       res
         .status(404)
         .json('Email Address not found');
         return;
      }

      const validPassword = await userData.checkPassword(req.body.password);

      if (!validPassword) {
        res
           .status(401)
           .json('Incorrect email or password, try again');
           return;
      }

       req.session.save(() => {
         req.session.user = userData;

         res.status(200).json(userData);
        });
    } catch (error) {
     res.status(400).json(error);
    }
});

router.post('/logout', (req,res) => {
     req.session.destroy()
     res.status(204);
});

module.exports = router;
