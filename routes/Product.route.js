import express from "express";
const productRouter = express.Router();

import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/products.controller.js";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import upload from "../config/fileUpload.js";
import isAdmin from "../middlewares/isAdmin.js";

// productRouter.post("/", isLoggedIn, upload.array("files"), createProduct);
// productRouter.post("/", isLoggedIn, upload.single("file"), createProduct);
productRouter.post("/", isLoggedIn, isAdmin, upload.array("files"), createProduct);

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProduct);
productRouter.put("/:id", isLoggedIn, isAdmin, updateProduct);
productRouter.delete("/:id/delete", isLoggedIn, isAdmin, deleteProduct);

export default productRouter;
