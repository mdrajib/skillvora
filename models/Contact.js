const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Contact = sequelize.define('Contact', {
  id:      { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name:    { type: DataTypes.STRING(150), allowNull: false },
  email:   { type: DataTypes.STRING(200), allowNull: false },
  phone:   { type: DataTypes.STRING(30) },
  subject: { type: DataTypes.STRING(200) },
  message: { type: DataTypes.TEXT, allowNull: false },
  status:  { type: DataTypes.ENUM('new','read','replied'), defaultValue: 'new' },
}, { tableName: 'contacts', timestamps: true, underscored: true });

module.exports = Contact;
