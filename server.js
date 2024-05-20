const express = require("express");
const { server } = require("./config/all.config");
const searchRouter = require("./routes/searchRouter");

const MainRouter = require("./routes/MainRouter");
const app = express();
const cookieParser = require("cookie-parser");
const { mongoose } = require("./config/mongoose.config");
const cors = require("cors");

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", searchRouter);
app.use("/api", MainRouter);

mongoose;

app.listen(server.port, (req, res) => {
  console.log(`App runing on port ${server.port}`);
});
