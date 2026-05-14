import express from "express";
import {createPreference, paymentWebhook} from "../controllers/paymentController.js";
import {verifyToken} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/create-preference",
  verifyToken,
  createPreference
);
router.use("/webhook", paymentWebhook);

export default router;