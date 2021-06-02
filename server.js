const express = require("express");
const mongoose = require("mongoose");
const data = require("./data");

const app = express();

app.get("/api/categories", (req, res) => {
  res.send(data.categories);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});