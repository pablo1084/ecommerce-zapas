import express from "express";
import { createPreference } from "../controllers/paymentController.js";
import {verifyToken} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/create-preference",
  verifyToken,
  createPreference
);

export default router;