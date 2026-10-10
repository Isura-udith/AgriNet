const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  selected: { type: Boolean, default: false },
});

const CartItem = mongoose.model("CartItem", cartSchema);

module.exports = CartItem;
