// Level model
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
        level_number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        reward: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10,4),
            allowNull: false
        },
        gameId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'game',
                key: 'id',
            },
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'level',
    }
);

module.exports = Level;