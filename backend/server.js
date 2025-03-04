import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import { Product } from "./models/Product.js";

dotenv.config();
const app = express();

app.use(express.json()); // middleware which allows to accpet JSON data in the req.body

app.get("/", (req, res) => {
  res.send("server is ready");
});

app.post("/api/products", async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log("Server error", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.listen(5000, () => {
  connectDb();
  console.log("Server started at 5000");
});
