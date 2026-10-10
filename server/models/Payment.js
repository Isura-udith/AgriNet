const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
  {
    receiverDetails: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
    },
    cardDetails: {
      cardNumber: { type: String, required: true }, // Masked for PCI compliance (e.g., ****-****-****-1234)
      expiryDate: { type: String, required: true },
    },
    status: {
      type: String,
      default: 'Completed',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', PaymentSchema);
