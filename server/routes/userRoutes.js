const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');
const User = require('../models/userModel');

const router = express.Router();

// User Registration Route
// POST /api/users/register
router.post('/register', registerUser);

// User Login Route
// POST /api/users/login
router.post('/login', loginUser);

// Fetch Logged-In User’s Details (Protected)
// GET /api/users/:id
router.get('/:id', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user details.', error: error.message });
  }
});

// Fetch Users by Role (Buyers or Sellers)
// GET /api/users/role/:role
router.get('/role/:role', authenticate, async (req, res) => {
  const { role } = req.params;

  try {
    if (!['buyer', 'seller'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role. Use "buyer" or "seller".' });
    }

    const users = await User.find({ role }).select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users.', error: error.message });
  }
});

// GET all users or filter by role
router.get('/', async (req, res) => {
  try {
    const { role } = req.query;
    const filter = role ? { role } : {};

    const users = await User.find(filter).select('-password');

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found.' });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ message: 'Error fetching users.' });
  }
});

// Update user by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = { ...req.body };

    // Prevent direct raw password overwrite via PUT route without hashing
    delete updatedData.password;

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).json({ message: 'Error updating user.' });
  }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).json({ message: 'Error deleting user.' });
  }
});

module.exports = router;