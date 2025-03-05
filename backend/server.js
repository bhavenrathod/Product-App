import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import { router } from "./routers/product.router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // middleware which allows to accpet JSON data in the req.body
app.use("/api/products/", router);

app.listen(PORT, () => {
  connectDb();
  console.log("Server started at " + PORT);
});
