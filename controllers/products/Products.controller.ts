import { NextFunction, Request, Response } from "express";
import Product from "../../infrastructure/models/Product.model";
import Category from "../../infrastructure/models/Category.model";
import mongoose from "mongoose";

//@desc					Get all products
//@route 				GET
//@access 			Public
export async function getProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const products = await Product.find();

    return (
      res.status(200).json({
        success: true,
        message: "Products loaded successfully",
        products,
      }),
      next()
    );
  } catch (error) {
    return res.status(500).json({ success: false, message: error }), next();
  }
}

//@desc					Get single products
//@route 				GET
//@access 			Public
export async function getProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Check if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return (
        res.status(400).json({ message: "Invalid Product ID format" }), next()
      );
    }

    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
      return (
        res
          .status(404)
          .json({ success: false, message: "Product doesn't exist!" }),
        next()
      );
    }

    return (
      res.status(200).json({
        success: true,
        message: "Product loaded successfully",
        product,
      }),
      next()
    );
  } catch (error) {
    return res.status(500).json({ success: false, message: error }), next();
  }
}

//@desc					ADD a product
//@route 				POST
//@access 			Public
export async function addProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      name,
      description,
      richDescription,
      image,
      brand,
      price,
      category,
      countInStock,
      rating,
      numbReviews,
      isFeatured,
    } = req.body;

    // Check if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(category)) {
      return (
        res.status(400).json({ message: "Invalid Category ID format" }), next()
      );
    }

    const categoryId = await Category.findById(category);

    if (!categoryId)
      return res.status(400).json({ message: "Invalid category" }), next();

    const product = new Product({
      name,
      description,
      richDescription,
      image,
      brand,
      price,
      category,
      countInStock,
      rating,
      numbReviews,
      isFeatured,
    });

    const productSaved = await product.save();

    if (!productSaved) {
      return (
        res.status(500).json({ success: false, message: "Some error" }), next()
      );
    }

    return (
      res.status(201).json({
        success: true,
        message: "Product created successfully",
        productSaved,
      }),
      next()
    );
  } catch (error) {
    return res.status(500).json({ success: false, message: error }), next();
  }
}
//@desc					Update a product
//@route 				PUT
//@access 			Public
export async function updateProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      name,
      description,
      richDescription,
      image,
      brand,
      price,
      category,
      countInStock,
      rating,
      numbReviews,
      isFeatured,
    } = req.body;

    // Check if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(category)) {
      return (
        res.status(400).json({ message: "Invalid Category ID format" }), next()
      );
    }
    let product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        richDescription,
        image,
        brand,
        price,
        category,
        countInStock,
        rating,
        numbReviews,
        isFeatured,
      },
      { new: true }
    );

    if (!product) {
      return (
        res
          .status(404)
          .json({ success: false, message: "Category cannot be updated!" }),
        next()
      );
    }

    return (
      res.status(201).json({
        success: true,
        message: `Category ${req.params.id} with has been updated successfully`,
        product,
      }),
      next()
    );
  } catch (error) {
    return (
      res.status(400).json({
        success: true,
        message: error,
      }),
      next()
    );
  }
}

//@desc					Delete Product
//@route 				DELETE
//@access 			Public
export async function deleteProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let productExist = await Product.findByIdAndDelete(req.params.id);

    if (!productExist) {
      return (
        res
          .status(404)
          .json({ success: false, message: "Product cannot be found!" }),
        next()
      );
    }

    return (
      res.status(200).json({
        success: true,
        message: `Product ${req.params.id} with has been deleted successfully`,
      }),
      next()
    );
  } catch (error) {
    return (
      res.status(400).json({
        success: true,
        message: error,
      }),
      next()
    );
  }
}
