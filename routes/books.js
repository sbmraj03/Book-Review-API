const express = require('express');
const router = express.Router();

// Middleware to check JWT authentication
const auth = require('../middleware/auth');

// Controller that contains all the logic for book-related routes
const bookController = require('../controllers/bookController');

// ✅ Route to create a new book (only for authenticated users)
router.post('/', auth, bookController.createBook);

// ✅ Route to get all books (supports pagination and optional filters by author/genre)
router.get('/', bookController.getAllBooks);

// ✅ Route to search books by title or author (case-insensitive)
router.get('/search', bookController.searchBooks);

// ✅ Route to get a single book by its ID, including reviews and average rating
router.get('/:id', bookController.getBookById);

module.exports = router;
