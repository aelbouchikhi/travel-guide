const mongoose = require('mongoose');

const thingsToDoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    type: {
        type: [String],
        required: true
    },
    reviews: {
        type: [
            {
                user: String,
                comment: String,
                images: [String],
                rating: Number
            }
        ],
        required: false
    },
    rating: {
        type: Number,
        required: false
    },
    images: {
        type: [String],
        required: false
    },
    popularity: {
        type: Number,
        required: false
    },
    priceRange: {
        type: Object,
        required: false
    },
    openHour: {
        type: String,
        required: false
    },
    closeHour: {
        type: String,
        required: false
    },
    duration: {
        type: String,
        required: false
    },
    features: {
        type: String,
        required: false
    },
    requirements: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('ThingsToDo', thingsToDoSchema);
