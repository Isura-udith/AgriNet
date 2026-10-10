const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
  sellerName: { type: String, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  imagePath: { 
    type: String, 
    required: true, 
    default: "/uploads/default-placeholder.png" 
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
