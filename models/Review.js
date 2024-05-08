const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Review extends Model {}

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        review_text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        game_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'game',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'review'
    }
);

module.exports = Review;