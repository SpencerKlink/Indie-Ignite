// Game model
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Game extends Model {}

Game.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },genre_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'genre',
                key: 'id'
            }
        },
        image: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        trailer: {
            type: DataTypes.STRING,
            allowNull: true
       }
    },

    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        timestamps: false,
        modelName: 'game'
    }
);

module.exports = Game;
