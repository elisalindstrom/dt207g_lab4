const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Schema + model
const jwt = require("jsonwebtoken");

// Registrering
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body; // Data från request body

        // Validering
        if (!username || !password) return res.status(400).json({ message: "Username and password required" });

        const user = new User({ username, password });
        await user.save();

        return res.status(201).json({ message: "User created" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body; // Data från request body

        // Validering
        if (!username || !password) return res.status(400).json({ message: "Username and password required" });

        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ error: "Invalid username or password" });

        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) return res.status(401).json({ error: "Invalid username or password" });

        const payload = { username: username };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        const response = {
            message: "User logged in",
            token: token
        };

        return res.status(200).json({ response });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

module.exports = router;