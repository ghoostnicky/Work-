const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('./userModel');

const Investment = sequelize.define('Investment', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sector: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  roi_percent: {
    type: DataTypes.FLOAT,
    defaultValue: 0.5
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending'
  },
  start_date: {
    type: DataTypes.DATE
  },
  end_date: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'investments'
});

module.exports = { Investment };
