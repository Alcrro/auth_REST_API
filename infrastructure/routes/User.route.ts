import express from "express";
import {
  getAllUsers,
  getProfile,
  getSingleUser,
} from "../../controllers/users/Users.controller";

const router = express.Router();

router.get("/user", getSingleUser);
router.get("/users", getAllUsers);
router.get("/profile", getProfile);

export default router;
