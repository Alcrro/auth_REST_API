import express from "express";
import { getUsers } from "../controllers/users/Users.controller";

export const userRouter = express.Router();

userRouter.route("/users").get(getUsers);
