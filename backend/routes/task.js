const express = require("express");
const Task = require("../models/Task");
const router = express.Router();
const authenticate = require("../middleware/auth");

// Create Interview

router.post("/",authenticate, async(req,res) =>{
    const {title, date, company, rounds} = req.body;
    const task = new Task({ user: req.user.id, title, date, company, rounds });
    await task.save();
    res.json({message: "Form Submitted"});
});

// Get Interview based on user Id 

router.get("/", authenticate, async(req, res) =>{
    const tasks = await Task.find({ user: req.user.id });
    res.json({ tasks });
})

module.exports = router;