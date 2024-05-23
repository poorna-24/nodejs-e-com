import express from "express";
import { createCategory, deleteCategory, getAllCategories, getSingleCategory, updateCategory } from "../controllers/category.controller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
const categoriesRouter = express.Router();

categoriesRouter.post("/", isLoggedIn, createCategory);
categoriesRouter.get("/", getAllCategories);
categoriesRouter.get("/:id", getSingleCategory);
categoriesRouter.put("/:id", updateCategory);
categoriesRouter.delete("/:id", deleteCategory);

export default categoriesRouter;
