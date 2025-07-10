// middleware/verifyToken.js
const jwt = require('jsonwebtoken');
require('dotenv').config()
const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // ✅ From cookie

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = verifyToken;
