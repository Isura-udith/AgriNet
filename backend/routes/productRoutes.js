const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { addProduct } = require("../controllers/productController");
const Product = require("../models/productModel");

const router = express.Router();

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, JPG, PNG, and GIF are allowed."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

router.post("/", (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Handle Multer errors (e.g., file too large)
      console.error("Multer error:", err.message);
      return res.status(400).json({ message: `Multer error: ${err.message}` });
    } else if (err) {
      // Handle other errors
      console.error("File upload error:", err.message);
      return res.status(400).json({ message: `File upload error: ${err.message}` });
    }

    // Validate required body fields
    const { productName, productPrice, sellerName, quantity, category } = req.body;
    if (!productName || !productPrice || !sellerName || !quantity || !category) {
      return res.status(400).json({ message: "Missing required product details." });
    }

    // Set the imagePath. If no file is uploaded, use a default placeholder image.
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "/uploads/default-placeholder.png";

    // Create a new product instance
    const product = new Product({
      productName,
      productPrice,
      sellerName,
      quantity,
      category,
      imagePath, // Assign imagePath to the model field
    });

    // Save the product to the database
    product
      .save()
      .then(() => res.status(201).json({ message: "Product added successfully!", product }))
      .catch((error) => {
        console.error("Error saving product:", error.message);
        res.status(500).json({ message: "Failed to save product.", error: error.message });
      });
  });
});



router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    // Ensure every product has a valid imagePath
    const updatedProducts = products.map((product) => ({
      ...product.toObject(),
      imagePath: product.imagePath
        ? `/uploads/${path.basename(product.imagePath)}`
        : "/uploads/default-placeholder.png", // Fallback placeholder image
    }));
    res.status(200).json(updatedProducts);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Server error while fetching products." });
  }
});



module.exports = router;


// // Mock database query for demonstration
// router.get("/", async (req, res) => {
//   try {
//     const products = await Product.find(); // Fetch all products from the database
//     res.status(200).json(products);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ message: "Server error while fetching products" });
//   }
// });