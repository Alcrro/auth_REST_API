import express from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../../controllers/products/Products.controller";

const router = express.Router();

router.route("/products").get(getProducts);
router.route("/product/:id").get(getProduct);
router.route("/product").post(addProduct);
router.route("/product/:id").put(updateProduct);
router.route("/product/:id").delete(deleteProduct);

export default router;
