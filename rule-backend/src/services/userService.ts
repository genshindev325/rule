import jwt from "jsonwebtoken";

import { IUser } from '../interfaces/userInterface';
import User from "../models/userModel";


export const registerUser = async (username: string, email: string, password: string, role:string) => {
  const user = new User({ username, email, password, role });
  await user.save();
  return generateToken(user._id);
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new Error("Invalid email or password");
  }
  return generateToken(user._id);
};

const generateToken = (id: any) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "", {
    expiresIn: "30d",
  });
};
