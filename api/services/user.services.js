import jwt from "jsonwebtoken";
import User from "../model/user.model";
import { hashPassword } from "../utils/encrypt";
import { verifyPassword } from "../utils/encrypt";

require("dotenv").config();

export async function createUser(input, res) {
  try {
    const { name, email, password } = input;
    const hashedPassword = hashPassword(password);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.TOKEN_EXPIRATION }
    );

    return {
      user: {
        id: newUser.id,
        name: newUser.name,
      },
      token,
    };
  } catch (error) {
    if (error.code === 11000) {
      res.status(409);
      throw new Error("User already exists");
    } else throw new Error(error);
  }
}

export async function login(input, res) {
  try {
    const { email, password } = input;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      res.status(400);
      throw new Error("email or password is invalid");
    }

    const confirmPassword = verifyPassword(password, user.password);
    if (!confirmPassword) {
      res.status(400);
      throw new Error("email or password is invalid");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.TOKEN_EXPIRATION }
    );

    return {
      user: {
        id: user.id,
        name: user.name,
      },
      token,
    };
  } catch (error) {
    throw new Error(error);
  }
}
