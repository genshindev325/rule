import express from "express";
import { signUp, signIn } from "../controllers/userController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/signin", signIn);

router.post("/signup", signUp);

router.get("/profile", protect, (req:any, res:any) => {
  res.json({ user: req.user });
});

export default router;
