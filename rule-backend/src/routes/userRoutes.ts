import express from "express";
import { register, login } from "../controllers/userController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, (req:any, res:any) => {
  res.json({ user: req.user });
});

export default router;
