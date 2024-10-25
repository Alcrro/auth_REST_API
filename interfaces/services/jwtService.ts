import jwt from "jsonwebtoken";
import { IUser } from "../../infrastructure/models/User.model";
const generateToken = (user: IUser) => {
  return jwt.sign({ user: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
};

const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};

export default { generateToken, verifyToken };
