import express from "express";
const productRouter = express.Router();

import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/products.controller.js";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import upload from "../config/fileUpload.js";

// productRouter.post("/", isLoggedIn, upload.array("files"), createProduct);
// productRouter.post("/", isLoggedIn, upload.single("file"), createProduct);
productRouter.post("/", isLoggedIn, upload.array("files"), createProduct);

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProduct);
productRouter.put("/:id", isLoggedIn, updateProduct);
productRouter.delete("/:id", isLoggedIn, deleteProduct);

export default productRouter;
