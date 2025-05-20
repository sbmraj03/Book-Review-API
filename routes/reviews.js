const express = require('express');
const router = express.Router();

// Middleware to protect routes (ensures the user is logged in via JWT)
const auth = require('../middleware/auth');

// Controller with logic for handling reviews
const reviewController = require('../controllers/reviewController');

// ✅ Add a review to a book (authenticated users only)
// Endpoint: POST /reviews/:id/reviews (where :id is the book ID)
router.post('/:id/reviews', auth, reviewController.addReview);

// ✅ Update a specific review (only the user who posted it can update)
// Endpoint: PUT /reviews/:id (where :id is the review ID)
router.put('/:id', auth, reviewController.updateReview);

// ✅ Delete a specific review (only the user who posted it can delete)
// Endpoint: DELETE /reviews/:id (where :id is the review ID)
router.delete('/:id', auth, reviewController.deleteReview);

module.exports = router;
