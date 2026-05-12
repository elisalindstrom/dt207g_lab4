const express = require("express");
const cors = require("cors");
const db = require("./db") // Koppling till databas
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 3000;

// Läs in routes
const authRoutes = require("./routes/authRoutes.js")

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/users", authRoutes);

// Skyddad route
app.get("/users/protected", authenticateToken, (req, res) => {
    res.json({ message: "Skyddad route" });
})

// Validering av token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Token

    // Token saknas
    if (token === null) return res.status(401).json({ message: "Not authorized for this route, token missing" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, username) => {
        // Felaktig token
        if(error) return res.status(403).json({message: "Incorrect JWT"});

        req.username = username;
        next();
    })
}

// Starta server
app.listen(port, () => {
    console.log("Server is running on http://localhost:" + port + "/users");
})