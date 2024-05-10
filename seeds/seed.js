const sequelize = require('../config/config.js');
const { User, Game, Genre } = require('../models');

// Import seed data from JSON file
const userData = require('./userSeedData.json');
const gameData = require('./gameSeedData.json');
const genreData = require('./genreSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await Genre.bulkCreate(genreData);

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
 
  await Game.bulkCreate(gameData);
 

  process.exit(0);
};

seedDatabase();