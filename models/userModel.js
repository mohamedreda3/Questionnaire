const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { required: false, type: String, default: "User" },
    Email: { unique: true, required: true, type: String },
    pass: { required: true, type: String, },
    answered: { type: Boolean, default: false }
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;