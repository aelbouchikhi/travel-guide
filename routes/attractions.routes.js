const express = require("express");
const router = express.Router();
const {
  getAllAttractions,
  getAttractionsById,
  createAttraction,
  updateAttraction,
  deleteAttraction,
  searchAttractions,
  getNearbyAttractions,
} = require("../controllers/attractions.controllers");

router.get("/", getAllAttractions); // Get all attractions
router.get("/:id", getAttractionsById); // Get attraction by ID
router.post("/", createAttraction); // Create a new attraction
router.put("/:id", updateAttraction); // Update attraction by ID
router.delete("/:id", deleteAttraction); // Delete attraction by ID

// Advanced querying routes
router.get("/search", searchAttractions); // Endpoint for searching attractions based on various criteria
router.get("/nearby", getNearbyAttractions); // Endpoint for getting nearby attractions based on user's location

module.exports = router;
