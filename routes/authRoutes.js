const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Schema + model
const authenticateToken = require("../middleware/authToken"); // Middleware

const router = express.Router();

// Skyddad route
router.get("/protected", authenticateToken, async (req, res) => {
    try {
        let result = await User.find({}, { password: 0 });
        res.json({ message: "Protected route", result });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

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

// Inloggning
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body; // Data från request body

        // Validering
        if (!username || !password) return res.status(400).json({ message: "Username and password required" });

        // Kontroll användarnamn
        let user = await User.findOne({ username: username });
        if (!user) return res.status(401).json({ error: "Invalid username or password" });

        // Kontroll lösenord
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) return res.status(401).json({ error: "Invalid username or password" });

        // Skapar JWT-token
        const payload = { username: username };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });

        user = await User.findOne({ username: username }, { password: 0 })

        const response = {
            message: "User logged in",
            user,
            token
        };

        return res.status(200).json({ response });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

module.exports = router;