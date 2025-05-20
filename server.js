// Load environment variables from .env file
require('dotenv').config();

// Import the function to connect to MongoDB
const connectDB = require('./config/db');

// Import the Express app instance
const app = require('./app');

// Use the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Connect to the MongoDB database before starting the server
connectDB();

// Start the Express server and listen on the specified port
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
