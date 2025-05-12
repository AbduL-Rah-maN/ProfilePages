const router = require("express").Router();
const Employer = require("../models/Employer");
const mongoose = require("mongoose");

// Get all employees (public)
router.get('/', async (req, res) => {
    try {
        const employees = await Employer.find();
        res.json({ 
            status: "success", 
            data: employees 
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to fetch employees",
            error: error.message
        });
    }
});

// Get employee by ID (public)
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ 
                status: "error",
                message: "Invalid employer ID." 
            });
        }

        const emp = await Employer.findById(id);
        if (!emp) {
            return res.status(404).json({ 
                status: "error",
                message: "Employer not found." 
            });
        }

        res.json({ 
            status: "success", 
            data: emp 
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to fetch employer",
            error: error.message
        });
    }
});

// Update employee (public - no ownership check)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Request Body:', req.body);  // Log the body to check what is being sent
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ 
                status: "error",
                message: "Invalid employer ID." 
            });
        }

        const updatedEmployer = await Employer.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedEmployer) {
            return res.status(404).json({ 
                status: "error",
                message: "Employer not found." 
            });
        }

        res.json({ 
            status: "success", 
            data: updatedEmployer 
        });
    } catch (error) {
        console.error("Error during update:", error);  // Log the error for debugging
        
        res.status(500).json({
            status: "error",
            message: "Failed to update employer",
            error: error.message
        });
    }
});



module.exports = router;