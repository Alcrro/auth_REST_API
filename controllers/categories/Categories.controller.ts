import { NextFunction, Request, Response } from "express";
import Category from "../../infrastructure/models/Category.model";

//@desc					Get all Categories
//@route 				GET
//@access 			Public

export async function getCategories(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const categories = await Category.find();

    if (!categories) {
      res.status(500).json({ success: false });
    }

    res.status(200).json({ categories });
  } catch (error) {}
}

//@desc					Get single category
//@route 				GET
//@access 			Public
export async function getCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      res.status(500).json({
        success: false,
        message: `The category with the given ID: ${req.params.id} was not found`,
      });
    }

    res.status(200).json({ category });
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

//@desc					Add category
//@route 				POST
//@access 			Public
export async function addCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const category = await Category.create({
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    });

    if (!category) {
      res
        .status(404)
        .json({ success: false, message: "the category cannot be created!" }),
        next();
    }

    res.status(201).json({
      success: true,
      message: "Category created successfully ",
      category,
    });
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

//@desc					Update category
//@route 				PUT
//@access 			Public
export async function updateCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
      },
      { new: true }
    );

    if (!category) {
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
        category,
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

//@desc					Delete category
//@route 				DELETE
//@access 			Public
export async function deleteCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let categoryExist = await Category.findByIdAndDelete(req.params.id);

    if (!categoryExist) {
      return (
        res
          .status(404)
          .json({ success: false, message: "Category cannot be found!" }),
        next()
      );
    }

    return (
      res.status(201).json({
        success: true,
        message: `Category ${req.params.id} with has been deleted successfully`,
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
