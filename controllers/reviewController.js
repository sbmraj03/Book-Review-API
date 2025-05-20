const Review = require('../models/Review');

// ✅ Add a review for a specific book (only one review per user per book)
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body; // Review content from request body
    const book = req.params.id;           // Book ID from URL parameter
    const user = req.user.id;             // User ID extracted from JWT token (middleware)

    // Check if the user has already reviewed this book
    const existing = await Review.findOne({ user, book });
    if (existing) return res.status(400).send('You already reviewed this book.');

    // Create and save the new review
    const review = new Review({ user, book, rating, comment });
    await review.save();

    // Return the newly created review
    res.status(201).json(review);
  } catch (err) {
    // Handle validation or other errors
    res.status(400).json({ error: err.message });
  }
};

// ✅ Update an existing review (only if the user owns it)
exports.updateReview = async (req, res) => {
  try {
    // Find the review by its ID
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).send('Review not found');

    // Check if the logged-in user is the owner of the review
    if (review.user.toString() !== req.user.id)
      return res.status(403).send('Not your review');

    // Update the fields only if new values are provided
    review.rating = req.body.rating ?? review.rating;
    review.comment = req.body.comment ?? review.comment;

    // Save the updated review
    await review.save();

    // Return the updated review
    res.json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Delete a review (only if the user owns it)
exports.deleteReview = async (req, res) => {
  try {
    // Find the review by its ID
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).send('Review not found');

    // Check if the logged-in user is the owner
    if (review.user.toString() !== req.user.id)
      return res.status(403).send('Not your review');

    // Delete the review from the database
    await review.deleteOne();

    // Respond with a confirmation message
    res.send('Review deleted');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
