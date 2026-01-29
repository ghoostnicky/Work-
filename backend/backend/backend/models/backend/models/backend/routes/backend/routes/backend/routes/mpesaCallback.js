const express = require('express');
const { Investment } = require('../models/investmentModel');
const { Transaction } = require('../models/transactionModel');

const router = express.Router();

// M-Pesa callback
router.post('/', async (req, res) => {
  const { payment_ref, amount, status } = req.body;

  try {
    // Find transaction
    const transaction = await Transaction.findOne({ where: { payment_ref } });
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

    // Update transaction status
    transaction.status = status === 'success' ? 'success' : 'failed';
    await transaction.save();

    // If successful, update investment status
    if (status === 'success') {
      const investment = await Investment.findByPk(transaction.investment_id);
      investment.status = 'active';
      investment.start_date = new Date();
      // Example: ROI paid after 1 month
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1);
      investment.end_date = endDate;
      await investment.save();
    }

    res.json({ message: 'Callback processed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
