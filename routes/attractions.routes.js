const express = require("express");
const attractionsRouter = express.Router();
const {
  getAllAttractions,
  getAttractionById,
  createAttraction,
  updateAttraction,
  deleteAttraction,
  searchAttractions,
  getNearbyAttractions,
} = require("./controllers/attractionController");

router.get("/", getAllAttractions); // Get all attractions
router.get("/:id", getAttractionById); // Get attraction by ID
router.post("/", createAttraction); // Create a new attraction
router.put("/:id", updateAttraction); // Update attraction by ID
router.delete("/:id", deleteAttraction); // Delete attraction by ID

// Advanced querying routes
router.get("/search", searchAttractions); // Endpoint for searching attractions based on various criteria
router.get("/nearby", getNearbyAttractions); // Endpoint for getting nearby attractions based on user's location

module.exports = attractionsRouter;
