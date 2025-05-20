const jwt = require('jsonwebtoken');

// This middleware checks for a valid JWT token in the request headers
module.exports = function (req, res, next) {
  // Get the Authorization header from the request (format: "Bearer <token>")
  const authHeader = req.headers.authorization;

  // If no token is provided, return 401 Unauthorized
  if (!authHeader) return res.sendStatus(401);

  // Extract the token from the "Bearer <token>" format
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using the secret key from the .env file
    const user = jwt.verify(token, process.env.JWT_SECRET);

    // Store the decoded user info in req.user so it can be used later
    req.user = user;

    // Call the next middleware or route handler
    next();
  } catch {
    // If the token is invalid or expired, return 403 Forbidden
    res.sendStatus(403);
  }
};
