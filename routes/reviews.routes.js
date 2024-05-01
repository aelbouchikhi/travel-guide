const express = require("express");
const { getReviewsByLocationId } = require("../controllers/reviews.controller");
const router = express.Router();

// router.post("/", createReview); // Create a new review
router.get("/:id", getReviewsByLocationId); // Get review by ID
// router.put("/:id", updateReview); // Update review by ID
// router.delete("/:id", deleteReview); // Delete review by ID

module.exports = router;
