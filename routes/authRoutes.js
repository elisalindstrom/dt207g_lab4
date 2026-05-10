const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Schema + model

// Routes
router.get("/", async (req, res) => {
    try {
        let result = await User.find();

        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Could not get User" });
    }
})

module.exports = router;