const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // To handle file paths
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes'); // Product routes
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const cartRoutes = require("./routes/cartRoutes");
const paymentRoutes = require('./routes/paymentRoutes');

dotenv.config();

// Create an Express app instance
const app = express();

// Connect to the database
connectDB();

app.use(express.json()); 

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Serve static files for product uploads (images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
app.use('/api/users', userRoutes); // User-related routes
app.use('/api/products', productRoutes); // Product routes (handled by productRoutes)
app.use("/api/cart", cartRoutes);
app.use('/api/payments', paymentRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware (must be after all routes)
app.use(notFound); // Custom 404 handler
app.use(errorHandler); // Global error handler

// Start the server after all middleware and routes are set up
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
