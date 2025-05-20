const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Used to hash and compare passwords securely
const jwt = require('jsonwebtoken'); // Used to generate JWT tokens
const User = require('../models/User'); // Mongoose model for User

// ✅ Route to register a new user
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash the password before saving to DB
    const hashed = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    const user = new User({ username, password: hashed });

    await user.save(); // Save to MongoDB

    res.status(201).send('User registered');
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Route to login a user and return a JWT token
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    // If user doesn't exist or password is incorrect
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Invalid credentials');
    }

    // Generate a JWT token containing the user's ID
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ token }); // Send the token in response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
