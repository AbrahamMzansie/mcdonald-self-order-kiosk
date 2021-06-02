const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const data = require("./data");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const Products = mongoose.model(
  "products",
  new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    price: Number,
    category: String,
    calories: Number,
  })
);
app.get("/api/products/seeds", async (req, res) => {
  const products = await Products.insertMany(data.products);
  res.send({ products });
});

app.get("/api/products", async (req, res) => {
  const { category } = req.query;
  const products = await Products.find(category ? { category } : {});
  res.send({ products });
});

app.post("/api/products", async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = newProduct.save();
  res.send({ savedProduct });
});

app.get("/api/categories", (req, res) => {
  res.send(data.categories);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
