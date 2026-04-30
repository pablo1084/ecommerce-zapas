import express from "express";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";
import {register,
        login,
        getMe,
        makeAdmin,
        updateMe
        }
        from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/make-admin", verifyToken, isAdmin, makeAdmin);
router.get("/me", verifyToken, getMe);
router.put("/me", verifyToken, updateMe);

export default router;