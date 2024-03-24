const express = require("express");
const router = express.Router();
const {
  createReview,
  getReviewById,
  updateReview,
  deleteReview,
} = require("./controllers/reviewController");

router.post("/", createReview); // Create a new review
router.get("/:id", getReviewById); // Get review by ID
router.put("/:id", updateReview); // Update review by ID
router.delete("/:id", deleteReview); // Delete review by ID

module.exports = router;
