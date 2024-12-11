const jwt = require('jsonwebtoken'); // Import JWT library

const authenticateToken = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from 'Bearer <token>'
  
  if (!token) {
    return res.status(401).json({
      message: "Access denied. No token provided.",
    });
  }

  // Verify the token using the secret (usually from .env file)
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Invalid token.",
      });
    }

    // Attach the decoded user to req.user
    req.user = user; // `user` is the decoded JWT payload
    next(); // Continue to the next middleware or the route handler
  });
};

module.exports = authenticateToken;
