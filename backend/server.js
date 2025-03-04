import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import { Product } from "./models/Product.js";
import mongoose from "mongoose";

dotenv.config();
const app = express();

app.use(express.json()); // middleware which allows to accpet JSON data in the req.body

// get all products endpoint
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error in fetching all the products", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// create product endpoint
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

app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: true, message: "Invalid Product Id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.log("Error in updating product", error.message);
    res.status(500).json({ success: false, message: "Product not updated" });
  }
});

// delete product endpoint
app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log("Error in deleting product", error.message);
    res.status(404).json({ success: false, message: "Product not found" });
  }
});

app.listen(5000, () => {
  connectDb();
  console.log("Server started at 5000");
});
