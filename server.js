const express = require("express");
const { server } = require("./config/all.config");
const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.listen(server.port, (req, res) => {
  console.log(`App runing on port ${server.port}`);
});
