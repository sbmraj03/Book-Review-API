const Book = require('../models/Book');
const Review = require('../models/Review');

// Create a new book (only for authenticated users)
exports.createBook = async (req, res) => {
  try {
    // Extract title, author, and genre from the request body
    const { title, author, genre } = req.body;

    // Create a new Book document
    const book = new Book({ title, author, genre });

    // Save it to the database
    await book.save();

    // Respond with the created book
    res.status(201).json(book);
  } catch (err) {
    // Handle validation or server errors
    res.status(400).json({ error: err.message });
  }
};

// Get all books with optional filters and pagination
exports.getAllBooks = async (req, res) => {
  try {
    // Extract query parameters: page, limit, author, genre
    const { page = 1, limit = 10, author, genre } = req.query;

    // Build a filter object dynamically
    const filter = {};
    if (author) filter.author = new RegExp(author, 'i'); // case-insensitive
    if (genre) filter.genre = new RegExp(genre, 'i'); // case-insensitive

    // Fetch filtered and paginated books
    const books = await Book.find(filter)
      .skip((page - 1) * limit) // Skip previous pages
      .limit(Number(limit));   // Limit the number of results per page

    // Return the books array
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single book by its ID including average rating and its reviews
exports.getBookById = async (req, res) => {
  try {
    // Find book by ID from the URL parameter
    const book = await Book.findById(req.params.id);

    if (!book) return res.status(404).send('Book not found');

    // Find all reviews for the book, and populate user info (username)
    const reviews = await Review.find({ book: book._id }).populate('user', 'username');

    // Calculate average rating
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1);

    // Return the book, its average rating, and all reviews
    res.json({
      book,
      averageRating: avgRating.toFixed(2), // round to 2 decimal places
      reviews
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Search books by partial title or author (case-insensitive)
exports.searchBooks = async (req, res) => {
  try {
    const { query } = req.query;

    // Use a case-insensitive regex to match either title or author
    const books = await Book.find({
      $or: [
        { title: new RegExp(query, 'i') },
        { author: new RegExp(query, 'i') }
      ]
    });

    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
