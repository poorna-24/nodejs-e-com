import express from "express";

const productRouter = express.Router();

import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/products.controller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

productRouter.post("/", isLoggedIn, createProduct);
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProduct);
productRouter.put("/:id", isLoggedIn, updateProduct);
productRouter.delete("/:id/delete", isLoggedIn, deleteProduct);

export default productRouter;
