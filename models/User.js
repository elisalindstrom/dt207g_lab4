const mongoose = require("mongoose");

// Schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: [true, "Fyll i användarnamn"], unique: true },
    password: { type: String, required: [true, "Fyll i lösenord"] },
    created: { type: Date, default: Date.now }
})

// Model
module.exports = mongoose.model("User", UserSchema);