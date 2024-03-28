const express = require("express");
const { server } = require("./config/all.config");
const searchRouter = require("./routes/searchRouter");


const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use('/api',searchRouter);

app.listen(server.port, (req, res) => {
  console.log(`App runing on port ${server.port}`);
});
