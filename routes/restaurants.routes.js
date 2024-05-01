const express = require("express");
const { restaurantsQueries, getRestaurantById } = require("../controllers/restaurants.controllers");
const router = express.Router();

// router.get("/", getAllRestaurants); // Get all restaurants
router.get("/:id", getRestaurantById); // Get restaurant by ID
// router.post("/", createRestaurant); // Create a new restaurant
// router.put("/:id", updateRestaurant); // Update restaurant by ID
// router.delete("/:id", deleteRestaurant); // Delete restaurant by ID
router.get('/',restaurantsQueries)

// Advanced querying routes
// router.get("/search", searchRestaurants); // Endpoint for searching restaurants based on various criteria
// router.get("/nearby", getNearbyRestaurants); // Endpoint for getting nearby restaurants based on user's location

module.exports = router;
