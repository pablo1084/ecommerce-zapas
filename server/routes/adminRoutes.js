import express from "express";

import {
  getAdminStats,
  getRecentOrders,
  getSalesAnalytics,
  getAllOrders,
  updateOrderStatus,
  getAllUsers,
  updateUserRole,
  toggleBlockUser
} from "../controllers/adminController.js";

import {
  verifyToken,
  isAdmin,
  isSuperAdmin
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get( "/stats", verifyToken, isAdmin, getAdminStats);
router.get( "/recent-orders", verifyToken, isAdmin, getRecentOrders);
router.get( "/sales-analytics", verifyToken, isAdmin, getSalesAnalytics);
router.get( "/orders", verifyToken, isAdmin, getAllOrders);
router.put( "/orders/:id", verifyToken, isAdmin, updateOrderStatus);
router.get( "/users", verifyToken, isSuperAdmin, getAllUsers);
router.put( "/users/:id/role", verifyToken, isSuperAdmin, updateUserRole);
router.put( "/users/:id/block", verifyToken, isSuperAdmin, toggleBlockUser);

export default router;