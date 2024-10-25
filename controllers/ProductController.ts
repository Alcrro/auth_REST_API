import { NextFunction, Request, Response } from "express";
import { IProductInteractor } from "../interfaces/IProductInteractor";
import mongoose from "mongoose";

export class ProductController {
  private productInteractor: IProductInteractor;

  constructor(productInteractor: IProductInteractor) {
    this.productInteractor = productInteractor;
  }

  async onCreateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { category } = req.body;

      // Check if the provided ID is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(category)) {
        return (
          res.status(400).json({ message: "Invalid Category ID format" }),
          next()
        );
      }

      // const categoryId = await this.productCategoryInteractor.findById(
      //   category
      // );

      // if (!categoryId)
      //   return res.status(400).json({ message: "Invalid category" }), next();

      const product = await this.productInteractor.createProduct(req.body);

      if (!product) {
        return (
          res.status(500).json({ success: false, message: "Some error" }),
          next()
        );
      }

      return (
        res.status(201).json({
          success: true,
          message: "Product created successfully",
          product,
        }),
        next()
      );
    } catch (error) {
      next(error);
    }
  }
  async onGetProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await this.productInteractor.getProduct(
        Number(req.params.limit),
        Number(req.params.offset)
      );

      res.status(200).json({
        success: true,
        message: "Product created successfully",
        products,
      });
    } catch (error) {
      next(error);
    }
  }
  async onUpdateProduct(req: Request, res: Response, next: NextFunction) {}
}
