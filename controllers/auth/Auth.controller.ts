import bcrypt, { compare } from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import User from "../../infrastructure/models/User.model";
import { ErrorResponse } from "../../utils/errorResponse";

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
    const { login_type } = req.body;
    console.log(login_type);

    if (login_type === "credentials") {
      return loginWithCredentials(req, res, next);
    }

    res.status(404).json({ success: false, message: "something is bad!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something is wrong!" });
  }
}
function loginWithCredentials(
  req: Request<
    import("express-serve-static-core").ParamsDictionary,
    any,
    any,
    import("qs").ParsedQs,
    Record<string, any>
  >,
  res: Response<any, Record<string, any>>,
  next: NextFunction
) {
  throw new Error("Function not implemented.");
}
