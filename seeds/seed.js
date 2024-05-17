const sequelize = require('../config/config.js');
const { User, Game, Genre, Level } = require('../models');

// Import seed data from JSON file
const userData = require('./userSeedData.json');
const gameData = require('./gameSeedData.json');
const genreData = require('./genreSeedData.json');
const levelData = require('./levelSeedData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await Genre.bulkCreate(genreData);

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
 
  await Game.bulkCreate(gameData);

  await Level.bulkCreate(levelData);
 

  process.exit(0);
};

seedDatabase();