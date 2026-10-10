const Product = require("../models/productModel");
const path = require("path");

const addProduct = async (req, res) => {
  try {
    const { productName, productPrice, sellerName, quantity, category } = req.body;
    console.log("Received product details:", { productName, productPrice, sellerName, quantity, category });

    const imagePath = `uploads/${req.file.filename}`;
    console.log("Image path:", imagePath);

    const product = new Product({
      productName,
      productPrice,
      sellerName,
      quantity,
      image: imagePath,
      category,
    });

    const savedProduct = await product.save();
    console.log("Product saved successfully:", savedProduct);

    res.status(201).json({ message: "Product added successfully!", product: savedProduct });
  } catch (error) {
    console.error("Error in addProduct:", error.message);
    res.status(500).json({ message: "Server error. Please try again.", error: error.message });
  }
};



module.exports = { addProduct };