const sequelize = require('../config/database');
const Course    = require('./Course');
const Mentor    = require('./Mentor');
const Contact   = require('./Contact');

// Associations
Mentor.hasMany(Course, { foreignKey: 'mentor_id', as: 'courses' });
Course.belongsTo(Mentor, { foreignKey: 'mentor_id', as: 'mentor' });

module.exports = { sequelize, Course, Mentor, Contact };
