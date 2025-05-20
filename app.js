const express = require('express');
const app = express();

// Import route handlers for authentication, books, and reviews
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const reviewRoutes = require('./routes/reviews');

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// Use authentication routes at the root path (e.g., /signup, /login)
app.use('/', authRoutes);

// Use book-related routes under /books (e.g., GET /books, POST /books)
app.use('/books', bookRoutes);

// Use review-related routes under /reviews
// This handles review update/delete routes like PUT /reviews/:id and DELETE /reviews/:id
// Also if your reviewRoutes file contains routes like POST /:id/reviews, these will work as /reviews/:id/reviews, so adjust accordingly
app.use('/reviews', reviewRoutes);

// Export the app to be used in your server file
module.exports = app;
