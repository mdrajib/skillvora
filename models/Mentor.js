const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Mentor = sequelize.define('Mentor', {
  id:         { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name:       { type: DataTypes.STRING(150), allowNull: false },
  slug:       { type: DataTypes.STRING(170), allowNull: false, unique: true },
  title:      { type: DataTypes.STRING(200) },
  expertise:  { type: DataTypes.STRING(300) },
  bio:        { type: DataTypes.TEXT },
  short_bio:  { type: DataTypes.STRING(300) },
  photo:      { type: DataTypes.STRING(300) },
  experience: { type: DataTypes.STRING(100) },
  linkedin:   { type: DataTypes.STRING(300) },
  twitter:    { type: DataTypes.STRING(300) },
  youtube:    { type: DataTypes.STRING(300) },
  website:    { type: DataTypes.STRING(300) },
  is_featured:{ type: DataTypes.BOOLEAN, defaultValue: false },
}, { tableName: 'mentors', timestamps: true, underscored: true });

module.exports = Mentor;
