import express from "express";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";
import {register,
        login,
        getMe,
        makeAdmin,
        updateMe,
        verifyEmail
        }
        from "../controllers/authController.js";

const router = express.Router();

router.get( "/verify/:token", verifyEmail);
router.post("/register", register);
router.post("/auth", login);
router.put("/make-admin", verifyToken, isAdmin, makeAdmin);
router.get("/me", verifyToken, getMe);
router.put("/me", verifyToken, updateMe);

export default router;