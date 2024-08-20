import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/userService";

export const register = async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;
  try {
    const token = await registerUser(username, email, password, role);
    res.status(201).json({ token });
  } catch (err:any) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await loginUser(email, password);
    res.status(200).json({ token });
  } catch (err:any) {
    res.status(400).json({ message: err.message });
  }
};
