const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied, no token provided" });

  try {
    const result = jwt.verify(token, "secretkey");
    req.user = result;   // SET req.user here for downstream use
    next();              // call next without sending any response here
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;
