const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

router.post('/', async (req, res) => {
  const { receiverDetails, cardDetails } = req.body;

  if (!receiverDetails || !cardDetails || !cardDetails.cardNumber || !cardDetails.expiryDate) {
    return res.status(400).json({
      message: 'Payment Failed! Please provide valid payment details.',
      error: 'Missing required payment details',
    });
  }

  try {
    // Mask sensitive credit card number (retain only last 4 digits) and discard CVV
    const rawNumber = String(cardDetails.cardNumber).replace(/\s+/g, '');
    const last4 = rawNumber.slice(-4);
    const maskedCardNumber = `****-****-****-${last4}`;

    const payment = new Payment({
      receiverDetails: {
        name: receiverDetails.name,
        address: receiverDetails.address,
        city: receiverDetails.city,
      },
      cardDetails: {
        cardNumber: maskedCardNumber,
        expiryDate: cardDetails.expiryDate,
      },
      status: 'Completed',
    });

    await payment.save();
    res.status(201).json({ message: 'Payment processed successfully', paymentId: payment._id });
  } catch (error) {
    res.status(500).json({
      message: 'Payment Failed! Please try again.',
      error: error.message,
    });
  }
});

module.exports = router;
