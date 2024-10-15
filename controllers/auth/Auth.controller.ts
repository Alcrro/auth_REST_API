import bcrypt, { compare } from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import User from "../../models/User.model";
import { ErrorResponse } from "../../utils/errorResponse";
import jwt from "jsonwebtoken";

//@desc					Register user
//@route 				POST
//@access 			Public

export async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password, isAdmin } = req.body;
    const user = await User.findOne({ email: req.body.email }).select(
      "-password"
    );
    console.log(user);

    if (user) {
      res.status(404).json({
        success: false,
        message: "User already exist!",
      });
    } else if (email === "" || password === "") {
      //Check if fields are empty
      return next(ErrorResponse("Please complete the fields", 404));
    } else {
      const user = await User.create({
        email,
        password: await bcrypt.hash(password, 10),
        isAdmin,
      });

      res.status(200).json({
        success: true,
        message: "Te-ai inregistrat cu success!",
        data: user,
      });
    }
  } catch (error) {
    next(error);
  }
}

//@desc					Login user
//@route 				POST
//@access 			Public
export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const ipUser = req.ip;
    console.log(ipUser);

    const { email, password } = req.body;
    const user = await User.findOne({ email: req.body.email });

    if (email === "" || password === "") {
      return (
        res
          .status(400)
          .json({ success: false, message: "Credentials are not correctly" }),
        next()
      );
    }
    if (!user) {
      return (
        res.status(400).json({ success: false, message: "The user not found" }),
        next()
      );
    }
    if (user && bcrypt.compareSync(req.body.password, user?.password!)) {
      const secret = process.env.SECRET!;
      const token = jwt.sign(
        {
          userId: user.id,
          isAdmin: user.isAdmin,
        },
        secret,
        {
          expiresIn: "1d",
        }
      );
      return (
        res.status(200).json({
          success: true,
          message: "User Authenticated",
          email: user.email,
          token,
        }),
        next()
      );
    } else {
      res.status(400).json({ success: false, message: "Password is wrong" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Something is wrong!" });
  }
}
