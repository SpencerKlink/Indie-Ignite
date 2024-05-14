const Sequelize = require('sequelize');
require('dotenv').config();

// const env = process.env.NODE_ENV || 'development'; 
// const config = {
//     development: {
//         username: process.env.DB_USER,
//         password: process.env.DB_PASS,
//         database: process.env.DB_NAME,
//         host: process.env.DB_HOST,
//         dialect: 'mysql',
//         port: 3306 
//     },
//     test: {
//         username: process.env.DB_USER,
//         password: process.env.DB_PASS,
//         database: process.env.DB_NAME,
//         host: process.env.DB_HOST,
//         dialect: 'mysql',
//         port: 3306 
//     },
//     production: {
//         username: process.env.DB_USER || "root",
//         password: process.env.DB_PASS, 
//         database: process.env.DB_NAME || "database_production",
//         host: process.env.DB_HOST || "localhost",
//         dialect: 'mysql',
//         port: 3306 
//     }
// }[env];

let sequelize;

if (process.env.JAWSDB_URL) {
 console.log(process.env.JAWSDB_URL)
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
    },
  );
}

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
