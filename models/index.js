const Game = require('./Game');
const User = require('./User');
const Review = require('./Review');
const Genre = require('./Genre');
const Level = require('./Level');

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

Game.belongsTo(Genre, {
    foreignKey: 'genre_id',
});

Genre.hasMany(Game, {
    foreignKey: 'genre_id',
    onDelete: 'CASCADE',
});

Game.hasMany(Level, {
    foreignKey: 'game_id',
});

Level.belongsTo(Game, {
    foreignKey: 'game_id',
});

module.exports = { Game, User, Review, Genre, Level };