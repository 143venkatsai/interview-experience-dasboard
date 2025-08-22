const express = require("express");
const Task = require("../models/Task");
const adminAuthenticate = require("../middleware/adminAuth"); 
const router = express.Router();

// get Interviews

router.get("/tasks", adminAuthenticate, async(req, res) =>{
    const tasks = await Task.find();
    res.json(tasks);
});

// update Interview

router.put("/task/:id", adminAuthenticate, async(req, res) =>{
    const {status} = req.body;
    const updatedStatus = await Task.findByIdAndUpdate(req.params.id, {status});
    res.json({message: "Status Updated"});
})

module.exports = router;