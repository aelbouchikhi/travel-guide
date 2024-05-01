// this Router is The main

const express = require("express");
const router = express.Router();
// const usersRouter = require("./users.routes");
// const hotelsRouter = require("./hotels.routes");
const restaurantsRouter = require("./restaurants.routes");
const attractionsRouter = require("./attractions.routes");
const hotelsRouter = require("./hotels.routes");
const placesRouter = require("./places.routes");
const reviewsRouter = require("./reviews.routes");
const forumRouter = require("./forums.routes");

// MainRouter.use("/users", usersRouter);
router.use("/hotels", hotelsRouter);
router.use("/restaurants", restaurantsRouter);
router.use("/attractions", attractionsRouter);
router.use('/places',placesRouter)
router.use("/reviews", reviewsRouter);
router.use("/forum", forumRouter);

module.exports = router;
