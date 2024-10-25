import express from "express";
import {
  addCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../../controllers/categories/Categories.controller";

const router = express.Router();

router.route("/categories").get(getCategories);
router.route("/category/:id").get(getCategory);
router.route("/category").post(addCategory);
router.route("/category/:id").put(updateCategory);
router.route("/category/:id").delete(deleteCategory);

export default router;
