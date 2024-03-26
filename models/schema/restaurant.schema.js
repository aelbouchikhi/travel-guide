const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
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
        required: false
    },
    location: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    categories: {
        type: [String],
        required: false
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
    menu: {
        type: Object,
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
    website: {
        type: String,
        required: false
    },
    features: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
