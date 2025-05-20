const mongoose = require('mongoose');

// Define the schema (structure) for a User document in MongoDB
const userSchema = new mongoose.Schema({
  // Username must be a string, is required, and must be unique
  username: { type: String, required: true, unique: true },

  // Password must be a string and is required
  // This will usually be stored in hashed form (not plain text)
  password: { type: String, required: true }
});

// Export the 'User' model so you can use it to interact with the users collection
module.exports = mongoose.model('User', userSchema);
