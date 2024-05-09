const Sequelize = require('sequelize');
require('dotenv').config();

const env = process.env.NODE_ENV || 'development'; 
const config = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'mysql'
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'mysql'
    },
    production: {
        username: process.env.DB_USER || "root",
        password: process.env.DB_PASS, 
        database: process.env.DB_NAME || "database_production",
        host: process.env.DB_HOST || "localhost",
        dialect: 'mysql'
    }
}[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

module.exports = sequelize;
