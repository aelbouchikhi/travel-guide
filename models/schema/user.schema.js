const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    sex: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: Number,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    isVerified : {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('Users', userSchema);