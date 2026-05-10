const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: [true, "Fyll i användarnamn"], unique: true, trim: true },
    password: { type: String, required: [true, "Fyll i lösenord"] },
    created: { type: Date, default: Date.now }
})

// Hashning av lösenord innan user lagras
UserSchema.pre("save", async function () {
    try {
        if (this.isNew || this.isModified("password")) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }
    } catch (err) {
        next(err);
    }
})

// User registrering
UserSchema.statics.register = async function (username, password) {
    try {
        const user = new this({ username, password });
        await user.save();
        return user;
    } catch (err) {
        throw err;
    }
}

// Jämför angett lösenord med sparat lösenord
UserSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (err) {
        throw err;
    }
}

// Inloggning
UserSchema.statics.login = async function (username, password) {
    try {
        // Kontroll av user
        const user = await this.findOne({ username });

        if (!user) {
            throw new Error("User not found")
        }

        // Använder funktion för jämförelse av lösenord
        const isPasswordMatch = await user.comparePassword(password);

        if (!isPasswordMatch) {
            throw new Error("Incorrect password")
        }

        return user;
    } catch (err) {
        throw err;
    }
}

// Export av model
module.exports = mongoose.model("User", UserSchema);