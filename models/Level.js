// Game model
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Game = require('./Game');

class Level extends Model {}

Level.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        reward: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        gameId: {
            type: DataTypes.INTEGER,
            references: {
                model: Game,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        timestamps: false,
        modelName: 'level',
    }
);

module.exports = Level;


