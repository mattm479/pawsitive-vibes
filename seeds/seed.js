const sequelize = require('../config/connection');
const { User, Post } = require('../models');
const bcrypt = require('bcrypt');

const userData = require('./userData.json');
const postData = require('./postData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Hash passwords before bulk create
  for (const user of userData) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  console.log('Users seeded:', users);

  for (const post of postData) {
    try {
      await Post.create({
        ...post,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
      console.log('Post seeded:', post);
    } catch (error) {
      console.error('Error seeding post:', post, error);
    }
  }

  process.exit(0);
};

seedDatabase();
