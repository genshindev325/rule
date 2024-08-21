import { Request, Response } from "express";
import { signUpUser, signInUser } from "../services/userService";

export const signUp = async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;
  try {
    const token = await signUpUser(username, email, password, role);
    res.status(201).json({ token });
  } catch (err:any) {
    res.status(400).json({ message: err.message });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await signInUser(email, password);
    res.status(200).json({ token });
  } catch (err:any) {
    res.status(400).json({ message: err.message });
  }
};
