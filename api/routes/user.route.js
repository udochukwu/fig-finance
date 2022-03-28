import express from "express";
import UserController from "../controllers/user.controller";
import {
  registerValidator,
  loginValidator,
} from "../middlewares/user.middleware";

const userRouter = express.Router();

userRouter.post(
  "/auth/signup",
  registerValidator,
  UserController.createUser
);
userRouter.post("/auth/login", loginValidator, UserController.login);

export default userRouter;
