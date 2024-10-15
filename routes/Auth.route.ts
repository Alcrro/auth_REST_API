import express from "express";

import { loginUser, registerUser } from "../controllers/auth/Auth.controller";

export const auth = express.Router();

auth.route("/register").post(registerUser);
auth.route("/login").post(loginUser);
