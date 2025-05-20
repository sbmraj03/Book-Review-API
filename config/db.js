const mongoose = require('mongoose');

// This function connects your app to MongoDB using Mongoose
const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI from your .env file
    await mongoose.connect(process.env.MONGO_URI);

    // If successful, log confirmation
    console.log('✅ MongoDB connected');
  } catch (err) {
    // If connection fails, log the error and stop the server
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1); // Exit the process with failure
  }
};

// Export the function so it can be used in server.js
module.exports = connectDB;
