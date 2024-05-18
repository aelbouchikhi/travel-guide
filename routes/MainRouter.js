// this Router is The main

const express = require("express");
const MainRouter = express.Router();
// const usersRouter = require("./users.routes");
// const hotelsRouter = require("./hotels.routes");
// const restaurantsRouter = require("./restaurants.routes");
const attractionsRouter = require("./attractions.routes");
const usersRouter = require("./users.routes");
const postRouter = require("./post.routes");
// const reviewsRouter = require("./reviews.routes");

MainRouter.use("/users", usersRouter);
MainRouter.use("/forum/posts", postRouter);
// MainRouter.use("/hotels", hotelsRouter);
// MainRouter.use("/restaurants", restaurantsRouter);
// MainRouter.use("/attractions", attractionsRouter);
// MainRouter.use("/reviews", reviewsRouter);

module.exports = MainRouter;
