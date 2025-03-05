import express from "express";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

export const router = express.Router();

// get all products endpoint
router.get("/", getProducts);

// create product endpoint
router.post("/", createProduct);

router.put("/:id", updateProduct);

// delete product endpoint
router.delete("/:id", deleteProduct);
