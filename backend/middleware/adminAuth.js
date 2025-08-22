const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied, no token provided" });

  try {
    const user = jwt.verify(token, "secretkey");
    if (user.role !== "admin") return res.status(403).json({ message: "Forbidden: Admins only" });
    req.user = user;    
    next();             
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = adminAuth;
