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
  const newProduct = await new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send({ savedProduct });
});

app.get("/api/categories", async (req, res) => {
  res.send(data.categories);
});

const Order = mongoose.model(
  "Order",
  new mongoose.Schema(
    {
      number: { type: Number, default: 0 },
      orderType: String,
      paymentType: String,
      isPaid: { type: Boolean, default: false },
      isReady: { type: Boolean, default: false },
      inProgress: { type: Boolean, default: true },
      isCancelled: { type: Boolean, default: false },
      isDelivered: { type: Boolean, default: false },
      itemsPrice: Number,
      taxPrice: Number,
      totalPrice: Number,
      orderItems: [
        {
          name: String,
          price: Number,
          quantity: Number,
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);

app.post("/api/orderCreate", async (req, res) => {
  const lastOrder = await Order.find().sort({ number: -1 }).limit(1);
  const lastNumber = lastOrder.length === 0 ? 0 : lastOrder[0].number;
  if (
    !req.body.orderType ||
    !req.body.paymentType ||
    !req.body.orderItems ||
    req.body.orderItems.length === 0
  ) {
    return res.send({ messsage: "Data is required" });
  }
  const order = await new Order({
    ...req.body,
    number: lastNumber + 1,
  });

  const savedData = await order.save();
  if (savedData) {
    return res.send(savedData);
  } else {
    return res.send({ message: "Error creating order" });
  }
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
