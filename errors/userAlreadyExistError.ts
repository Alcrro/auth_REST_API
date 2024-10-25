import CustomError from "./appErrors";

const UserAlreadyExistsError = (email: string) =>
  new CustomError(`User with email ${email} already exist`, 400);

export default UserAlreadyExistsError;
