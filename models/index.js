const Game = require('./Game');
const User = require('./User');
const Review = require('./Review');

// Define associations

User.hasMany(Game, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
    });

Game.belongsTo(User, {
    foreignKey: 'user_id'
    });

Game.hasMany(Review, {
    foreignKey: 'game_id',
    onDelete: 'CASCADE'
    });