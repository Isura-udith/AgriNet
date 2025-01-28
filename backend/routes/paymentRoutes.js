const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment'); // model path is correct

router.post('/', async (req, res) => {
  console.log(req.body); // Log the incoming request body

  const { receiverDetails, cardDetails } = req.body;

  if (!receiverDetails || !cardDetails) {
    return res.status(400).json({ 
      message: 'Payment Failed! Please try again.', 
      error: 'Missing payment details' 
    });
  }

  try {
    const payment = new Payment({ receiverDetails, cardDetails});
    await payment.save();
    res.status(201).json({ message: 'Payment processed successfully', paymentId: payment._id });
  } catch (error) {
    res.status(500).json({ 
      message: 'Payment Failed! Please try again.', 
      error: error.message 
    });
  }
});


module.exports = router;
