const express = require("express");
const { server } = require("./config/all.config");
<<<<<<< HEAD
const searchRouter = require("./routes/searchRouter");


=======
const MainRouter = require("./routes/MainRouter");
>>>>>>> controllers
const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

<<<<<<< HEAD
app.use('/api',searchRouter);
=======
app.use("/api", MainRouter);
>>>>>>> controllers

app.listen(server.port, (req, res) => {
  console.log(`App runing on port ${server.port}`);
});
