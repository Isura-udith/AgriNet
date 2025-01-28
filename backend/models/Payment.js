const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  receiverDetails: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true }
  },
  cardDetails: {
    cardNumber: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cvv: { type: String, required: true }
  },
  
  
});

module.exports = mongoose.model('Payment', PaymentSchema);
