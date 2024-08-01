import express from "express";
import { createCategory, deleteCategory, getAllCategories, getSingleCategory, updateCategory } from "../controllers/category.controller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import categoryFileUpload from "../config/categoryUpload.js";
const categoriesRouter = express.Router();

categoriesRouter.post("/", isLoggedIn, categoryFileUpload.single("file"), createCategory);
categoriesRouter.get("/", getAllCategories);
categoriesRouter.get("/:id", getSingleCategory);
categoriesRouter.put("/:id", isLoggedIn, updateCategory);
categoriesRouter.delete("/:id", isLoggedIn, deleteCategory);

export default categoriesRouter;
