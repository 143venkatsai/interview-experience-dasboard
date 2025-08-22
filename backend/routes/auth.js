const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");

// Register 

router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email Already Exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });
    res.json({ message: "Registered" });
  } catch (error) {
    console.log("Registration Error: ", error);
    res.status(500).json({ message: "Failed to create user" });
  }
});


// Login 

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not Found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, "secretkey");
    res.json({ token, role: user.role });
  } catch (error) {
    console.log("Login Error: ", error);
    res.status(500).json({ message: "Failed to login user" });
  }
});


module.exports = router;