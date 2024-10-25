import mongoose from "mongoose";

export interface IUser {
  _id: string;
  id: string;
  email: string;
  password: string;
  isAdmin: boolean;
  googleId?: string;
  githubId?: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  googleId: {
    type: String,
  },
  githubId: {
    type: String,
  },
});

UserSchema.virtual("id").get(function () {
  return this._id.toString();
});

UserSchema.set("toJSON", {
  virtuals: true,
});

const User = mongoose.model("User", UserSchema);

export default User;
