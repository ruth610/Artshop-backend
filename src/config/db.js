const { Sequelize } = require('sequelize');

const db = new Sequelize(
  process.env.DB_NAME || 'artshop',
  process.env.DB_USERNAME || 'postgres',
  process.env.DB_PASSWORD || 'rutha',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
  }
);

db.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('DB connection error:', err));

module.exports = db;
