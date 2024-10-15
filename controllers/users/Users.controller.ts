import { NextFunction, Request, Response } from "express";
import User from "../../models/User.model";

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await User.find({});

    res
      .status(200)
      .json({ success: true, message: "Load users successfully", users });
  } catch (error) {
    next(error);
  }
}
