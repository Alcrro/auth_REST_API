import express from "express";
import {
  addCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/categories/Categories.controller";

export const categoryRouter = express.Router();

categoryRouter.route("/categories").get(getCategories);
categoryRouter.route("/category/:id").get(getCategory);
categoryRouter.route("/category").post(addCategory);
categoryRouter.route("/category/:id").put(updateCategory);
categoryRouter.route("/category/:id").delete(deleteCategory);
