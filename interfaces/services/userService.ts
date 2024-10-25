import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  createUser,
  findAllUsers,
  findUserByEmail,
} from "../repositories/userRepository";
import { IUser } from "../../infrastructure/models/User.model";

export const registerUser = async (userData: IUser): Promise<IUser> => {
  const userExist = await findUserByEmail(userData.email);

  if (userExist) throw new Error("User already exist");

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const user = await createUser({ ...userData, password: hashedPassword });

  return user;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<string> => {
  const user = await findUserByEmail(email);

  if (!user) throw new Error("User not found");

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (isValidPassword) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  return token;
};

export const getUser = async (email: string): Promise<IUser | void> => {
  const userExist = await findUserByEmail(email);

  if (!userExist) throw new Error("User not found");

  return userExist;
};
export const getUsers = async (): Promise<IUser[] | void> => {
  const userExist = await findAllUsers();

  if (!userExist) throw new Error("User not found");

  return userExist;
};
