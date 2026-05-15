import express from "express";

import {
  getAdminStats,
  getRecentOrders,
  getSalesAnalytics,
  getAllOrders
} from "../controllers/adminController.js";

import {
  verifyToken,
  isAdmin
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
  "/stats",
  verifyToken,
  isAdmin,
  getAdminStats
);

router.get(
  "/recent-orders",
  verifyToken,
  isAdmin,
  getRecentOrders
);

router.get(
  "/sales-analytics",
  verifyToken,
  isAdmin,
  getSalesAnalytics
);

router.get(
  "/orders",
  verifyToken,
  isAdmin,
  getAllOrders
);
export default router;