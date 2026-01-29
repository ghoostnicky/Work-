const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('./userModel');

const Transaction = sequelize.define('Transaction', {
  investment_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING, // "deposit" or "payout"
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING, // "pending", "success", "failed"
    defaultValue: 'pending'
  },
  payment_ref: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'transactions'
});

module.exports = { Transaction };
