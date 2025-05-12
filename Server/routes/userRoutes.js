const router = require("express").Router();
const User = require("../models/User");
const mongoose = require("mongoose");

// Get all users (public)
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json({ 
            status: "success", 
            data: users 
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to fetch users",
            error: error.message
        });
    }
});

// Get user by ID (public)
router.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params; // Capture the ID from the URL params

    // Check if the ID is valid (optional but recommended)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: "error", message: "Invalid User ID" });
    }

    const user = await User.findById(id);  // Find the user by ID from MongoDB
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    res.json({ status: "success", data: user });  // Send the user data back to the frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "An error occurred", error: error.message });
  }
});

// Update user by ID (public - no ownership check)
router.put('/:id', async (req, res) => {
  try {
    console.log("Request body:", req.body);  // Log the request body
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(
      id, 
      { $set: req.body }, 
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.json({ status: "success", data: updatedUser });
  } catch (error) {
    console.error("Error during update:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to update user",
      error: error.message
    });
  }
});


module.exports = router;
