const mongoose = require('mongoose');

// Define the schema for a Review document in MongoDB
const reviewSchema = new mongoose.Schema({
  // Reference to the Book this review is for (relation to Book model)
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },

  // Reference to the User who wrote the review (relation to User model)
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  // Rating given by the user (e.g., 4 or 5)
  rating: Number,

  // Optional comment by the user
  comment: String
});

// Export the 'Review' model to interact with the 'reviews' collection in MongoDB
module.exports = mongoose.model('Review', reviewSchema);
