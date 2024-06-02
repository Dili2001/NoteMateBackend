const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Note = sequelize.define('Note', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  // Define options
  tableName: 'Notes', // Explicitly set the table name to 'Notes'
  timestamps: true, // Ensure that Sequelize manages createdAt and updatedAt fields
});

// Define associations
Note.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

module.exports = Note;
