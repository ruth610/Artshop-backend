const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Art = db.define('Art', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  imageUrl: { type: DataTypes.STRING },
  category: { type: DataTypes.ENUM('painting', 'sculpture', 'digital'), allowNull: false },
  inStock: { type: DataTypes.BOOLEAN, defaultValue: true },
});

module.exports = Art;
