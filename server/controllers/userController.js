const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Register User
const registerUser = async (req, res) => {
  const { name, email, phone, idNumber, address, password, province, role } = req.body;

  // Validate required fields
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Create a new user (password is securely hashed via pre-save hook in userModel)
    const user = new User({
      name,
      email,
      phone: phone || '',
      idNumber: idNumber || '',
      address: address || '',
      password,
      province: province || '',
      role,
    });

    // Save the user to the database
    await user.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error during user registration:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password.' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Securely compare the entered password with the hashed password
    const isPasswordValid = await user.matchPassword(password.trim());
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Respond with user data and token
    res.status(200).json({
      message: 'Login successful.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error('Error during user login:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

module.exports = { registerUser, loginUser };
