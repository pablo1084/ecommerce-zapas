import express from "express";
import { register, login } from "../controllers/authController.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";
import { makeAdmin } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/make-admin", verifyToken, isAdmin, makeAdmin);

export default router;