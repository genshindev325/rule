import jwt from "jsonwebtoken";

import Store, { IStore } from "../models/storeModel";


export const signInStore = async (email: string, password: string) => {
  const store = await Store.findOne({ email });
  if (!store || !(await store.comparePassword(password))) {
    throw new Error("Invalid email or password");
  }
  return generateToken(store._id);
};

const generateToken = (id: any) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "", {
    expiresIn: "30d",
  });
};
