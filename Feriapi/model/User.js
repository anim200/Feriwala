const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: {
        type: String,
        default: '', // Default to an empty string or a default image URL
      },

    isAdmin: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

// Define createdAt as a function to be executed on document creation
UserSchema.pre('save', function(next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    next();
});

module.exports = mongoose.model("User", UserSchema);