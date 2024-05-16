// Game model
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

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
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        timestamps: false,
        modelName: 'Level'
    }
);

module.exports = Level;
