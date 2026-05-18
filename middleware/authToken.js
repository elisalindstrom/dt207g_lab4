const jwt = require("jsonwebtoken");

// Validering av token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Token

    // Token saknas
    if (!token) return res.status(401).json({ message: "Not authorized for this route, token missing" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, username) => {
        // Felaktig token
        if (error) return res.status(403).json({ message: "Incorrect JWT" });

        req.username = username;
        next();
    })
}

module.exports = authenticateToken;