const Game = require('./Game');
const User = require('./User');
const Review = require('./Review');
const Genre = require('./Genre');

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

module.exports = { Game, User, Review, Genre };