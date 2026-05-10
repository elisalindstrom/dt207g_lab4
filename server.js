const express = require("express");
const cors = require("cors");
const db = require("./db") // Koppling till databas

const app = express();
const port = process.env.PORT || 3000;

// Läs in routes
const authRoutes = require("./routes/authRoutes.js")

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/users", authRoutes);

// Starta server
app.listen(port, () => {
    console.log("Server is running on http://localhost:" + port + "/users");
})