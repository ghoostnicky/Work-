const express = require('express');
const { Investment } = require('../models/investmentModel');
const { Transaction } = require('../models/transactionModel');
const { authMiddleware } = require('./auth');

const router = express.Router();

// Create a new investment
router.post('/create', authMiddleware(['investor']), async (req, res) => {
  const { amount, sector, phone } = req.body;

  if (amount < 20000 || amount > 100000)
    return res.status(400).json({ message: 'Investment must be between KES 20,000 and 100,000' });

  try {
    const investment = await Investment.create({
      user_id: req.user.id,
      sector,
      amount,
      roi_percent: 0.5,
      status: 'pending'
    });

    // Create a transaction (pending until M-Pesa payment is completed)
    await Transaction.create({
      investment_id: investment.id,
      type: 'deposit',
      amount,
      status: 'pending',
      payment_ref: `MPESA-${Date.now()}`
    });

    // Here you would normally call M-Pesa API to initiate payment

    res.json({ message: 'Investment created, complete payment via M-Pesa', investment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get my investments
router.get('/my', authMiddleware(['investor']), async (req, res) => {
  const investments = await Investment.findAll({ where: { user_id: req.user.id } });
  res.json(investments);
});

module.exports = router;
