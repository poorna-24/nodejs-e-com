import express from "express";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createColor, deleteColor, getAllColors, getSingleColor, updateColor } from "../controllers/colors.controller.js";
const colorRouter = express.Router();

colorRouter.post("/", isLoggedIn, createColor);
colorRouter.get("/", getAllColors);
colorRouter.get("/:id", getSingleColor);
colorRouter.delete("/:id", isLoggedIn, deleteColor);
colorRouter.put("/:id", isLoggedIn, updateColor);

export default colorRouter;
