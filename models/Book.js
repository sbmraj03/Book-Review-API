const mongoose = require('mongoose');

// Define the schema (structure) for a Book document in MongoDB
const bookSchema = new mongoose.Schema({
  title: String,  // Title of the book (e.g., "The Old Man")
  author: String, // Author name (e.g., "Bankim Chattopadhyay")
  genre: String   // Genre/category (e.g., "Motivation")
});

// Export a Mongoose model called 'Book' using the schema above
// This allows us to interact with the 'books' collection in MongoDB
module.exports = mongoose.model('Book', bookSchema);
