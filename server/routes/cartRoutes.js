const express = require("express");
const CartItem = require("../models/Cart");

const router = express.Router();

// Get all cart items
router.get("/", async (req, res) => {
  try {
    const cart = await CartItem.find();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart items", error });
  }
});

// Add an item to the cart
router.post("/", async (req, res) => {
  try {
    const { name, price, image, quantity } = req.body;
    const newItem = new CartItem({ name, price, image, quantity });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: "Error adding item to cart", error });
  }
});

// Update an item in the cart (increment/decrement quantity)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { increment } = req.body;

    const item = await CartItem.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.quantity = increment ? item.quantity + 1 : Math.max(1, item.quantity - 1);
    const updatedItem = await item.save();

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Error updating item", error });
  }
});

// Remove an item from the cart
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await CartItem.findByIdAndDelete(id);
    res.status(200).json({ message: "Item removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error removing item", error });
  }
});

// Clear all items from the cart
router.delete("/", async (req, res) => {
  try {
    await CartItem.deleteMany();
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error });
  }
});

// Clear selected items from the cart
router.post("/clear-selected", async (req, res) => {
  try {
    const { ids } = req.body; // Array of item IDs to clear
    await CartItem.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ message: "Selected items cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing selected items", error });
  }
});

module.exports = router;