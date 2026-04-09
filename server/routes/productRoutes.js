import express from "express";
import {
  createProduct,
  getProducts,
  getAllProductsAdmin,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// públicas
router.get("/", getProducts);
router.get("/admin", verifyToken, isAdmin, getAllProductsAdmin);
router.get("/:id", getProductById);


// admin
router.post("/", verifyToken, isAdmin, createProduct);
router.put("/:id", verifyToken, isAdmin, updateProduct);
router.delete("/:id", verifyToken, isAdmin, deleteProduct);

export default router;