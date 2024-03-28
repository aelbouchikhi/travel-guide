const express = require("express");
const hotelsRouter = express.Router();
const {
  getAllHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel,
  searchHotels,
  getNearbyHotels,
} = require("./controllers/hotelController");

router.get("/", getAllHotels); // Get all hotels
router.get("/:id", getHotelById); // Get hotel by ID
router.post("/", createHotel); // Create a new hotel
router.put("/:id", updateHotel); // Update hotel by ID
router.delete("/:id", deleteHotel); // Delete hotel by ID

// Advanced querying routes
router.get("/search", searchHotels); // Endpoint for searching hotels based on various criteria (eg :PriceRange,Rating ...)
router.get("/nearby", getNearbyHotels); // Endpoint for getting nearby hotels based on user's location

module.exports = hotelsRouter;
