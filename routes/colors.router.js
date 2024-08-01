import express from "express";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createColor, deleteColor, getAllColors, getSingleColor, updateColor } from "../controllers/colors.controller.js";
import isAdmin from "../middlewares/isAdmin.js";
const colorRouter = express.Router();

colorRouter.post("/", isLoggedIn, isAdmin, createColor);
colorRouter.get("/", getAllColors);
colorRouter.get("/:id", getSingleColor);
colorRouter.put("/:id", isLoggedIn, isAdmin, updateColor);
colorRouter.delete("/:id", isLoggedIn, isAdmin, deleteColor);

export default colorRouter;
