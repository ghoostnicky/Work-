const express = require('express');
const { Investment } = require('../models/investmentModel');
const { authMiddleware } = require('./auth');

const router = express.Router();

// Get all investments (admin only)
router.get('/investments', authMiddleware(['admin']), async (req, res) => {
  try {
    const investments = await Investment.findAll();
    res.json(investments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Optionally: update investment status
router.post('/investment/:id/status', authMiddleware(['admin']), async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const investment = await Investment.findByPk(id);
    if (!investment) return res.status(404).json({ message: 'Investment not found' });

    investment.status = status;
    await investment.save();
    res.json({ message: 'Investment status updated', investment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
