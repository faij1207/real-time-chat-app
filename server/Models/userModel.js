const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024,
    },
}, {
    timestamps: true,
});


const userModel = mongoose.model('User', userSchema);

module.exports = userModel; 