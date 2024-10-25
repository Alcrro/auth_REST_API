import User, { IUser } from "../../infrastructure/models/User.model";

export const createUser = async (userData: IUser): Promise<IUser> =>
  User.create(userData);

export const findUserByEmail = async (email: string): Promise<IUser | null> =>
  User.findOne({ email });

export const findAllUsers = async (): Promise<IUser[] | null> => User.find();
