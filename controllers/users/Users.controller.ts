import { NextFunction, Request, Response } from "express";
import User from "../../infrastructure/models/User.model";
import asyncHandlerError from "../../utils/errorAsyncHandler";
import CustomError from "../../utils/errorTrycatchHandler";
import { getUser, getUsers } from "../../interfaces/services/userService";

export const getAllUsers = asyncHandlerError(
  async (req: Request, res: Response) => {
    try {
      const user = await getUsers();

      res.status(200).json({ user });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Unexpected error" });
      }
    }
  }
);

// export async function getUsers(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const users = await User.find({});

//     res
//       .status(200)
//       .json({ success: true, message: "Load users successfully", users });
//   } catch (error) {
//     next(error);
//   }
// }

export async function getProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const profile = await User.findOne({});

    if (!profile) {
      res.status(400).json({ success: false, message: "You are not allow" });
    }
    res.status(200).json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export const getSingleUser = asyncHandlerError(
  async (req: Request, res: Response) => {
    try {
      const user = await getUser(req.body.email);

      res.status(200).json({ user });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Unexpected error" });
      }
    }
  }
);
