import express from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/products/Products.controller";

export const productRouter = express.Router();

productRouter.route("/products").get(getProducts);
productRouter.route("/product/:id").get(getProduct);
productRouter.route("/product").post(addProduct);
productRouter.route("/product/:id").put(updateProduct);
productRouter.route("/product/:id").delete(deleteProduct);
