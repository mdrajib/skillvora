const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Course = sequelize.define('Course', {
  id:           { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title:        { type: DataTypes.STRING(200), allowNull: false },
  slug:         { type: DataTypes.STRING(220), allowNull: false, unique: true },
  description:  { type: DataTypes.TEXT },
  short_desc:   { type: DataTypes.STRING(300) },
  thumbnail:    { type: DataTypes.STRING(300) },
  duration:     { type: DataTypes.STRING(80) },
  level:        { type: DataTypes.ENUM('Beginner','Intermediate','Advanced'), defaultValue: 'Beginner' },
  price:        { type: DataTypes.DECIMAL(10,2), defaultValue: 0 },
  currency:     { type: DataTypes.STRING(10), defaultValue: 'BDT' },
  category:     { type: DataTypes.STRING(100) },
  curriculum:   { type: DataTypes.JSON },
  faq:          { type: DataTypes.JSON },
  is_featured:  { type: DataTypes.BOOLEAN, defaultValue: false },
  is_published: { type: DataTypes.BOOLEAN, defaultValue: true },
  mentor_id:    { type: DataTypes.INTEGER },
  enroll_url:   { type: DataTypes.STRING(300) },
}, { tableName: 'courses', timestamps: true, underscored: true });

module.exports = Course;
