import express from "express";
import { ProductController } from "../controllers/ProductController";
import { ProductRepository } from "../repositories/productRepository";
import { ProductInteractor } from "../interactors/productInteractor";

const productRepository = new ProductRepository();
const productInteractor = new ProductInteractor(productRepository);
const controller = new ProductController(productInteractor);

const router = express.Router();

router.post("/products", controller.onCreateProduct.bind(controller));
router.get(
  "/products/:limit/:offset",
  controller.onGetProduct.bind(controller)
);
router.patch("/products/:id", controller.onUpdateProduct.bind(controller));

export default router;
