import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  createOrder,
  getUserOrders,
  getOrderById
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", verifyToken, createOrder);
router.get("/", verifyToken, getUserOrders);
router.get("/:id", verifyToken, getOrderById);

export default router;



