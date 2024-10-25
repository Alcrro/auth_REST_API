import { IUser } from "../infrastructure/models/User.model";
import UserAlreadyExistsError from "../errors/userAlreadyExistError";

import {
  createUser,
  findUserByEmail,
} from "../interfaces/repositories/userRepository";
import bcrypt from "bcryptjs";

interface IUserRepository {
  findByEmail(email: string): Promise<IUser | null>;
  createUser(userData: IUser): Promise<IUser>;
}

interface IJwtService {
  generateToken(payload: object): string;
  verifyToken(token: string): object | null;
}
export const registerUser = async (
  userData: IUser,
  {
    userRepository,
    jwtService,
  }: { userRepository: IUserRepository; jwtService: IJwtService }
): Promise<IUser> => {
  const userExist = await userRepository.findByEmail(userData.email);

  if (userExist) throw UserAlreadyExistsError(userData.email);

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const user = await createUser({ ...userData, password: hashedPassword });

  return user;
};
