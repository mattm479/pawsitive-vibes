const router = require('express').Router();
const session = require('express-session');
const { User } = require('../../models');

router.post('/signup', async (req,res) => {
 try {
     const UserData = await User.create(req.body);

     req.session.save(() => {
       req.session.user = UserData;
       res.status(200).json(UserData);
     });
     }  catch (error) {
       res.status(400).json(error);
    }
});

router.post('/login', async (req,res) => {
  try {
     const UserData = await User.findOne({where: { email: req.body.email } });

     if (!UserData) {
       res
         .status(400)
         .json({message: 'incorrect email or password try again '});
         return;
      }

      const validPassword = await UserData.checkPassword(req.body.password);

      if (!validPassword) {
        res
           .status(400)
           .json({ message: 'Incorrect email or password, try again'})
           return;
      }

       req.session.save(() => {
         req.session.user = UserData;

         res.status(200).json(UserData);
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