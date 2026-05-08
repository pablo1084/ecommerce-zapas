import upload from "../middlewares/uploadMiddleware.js";
import { uploadProductImage, addImageToProduct } from "../controllers/productController.js";
import express from "express";
import {
  createProduct,
  getProducts,
  getAllProductsAdmin,
  getProductById,
  updateProduct,
  deleteProduct,
  restoreProduct,
  getProductAdminById
} from "../controllers/productController.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

//imagenes a productos
router.post("/upload-image", verifyToken, isAdmin, upload.array("images", 5), uploadProductImage);
router.post("/add-image", verifyToken, isAdmin, addImageToProduct);


router.get("/", getProducts);
router.get("/admin", verifyToken, isAdmin, getAllProductsAdmin);
router.get(
  "/admin/:id",
  verifyToken,
  isAdmin,
  getProductAdminById
);
router.get("/:id", getProductById);
router.patch("/restore/:id", verifyToken, isAdmin, restoreProduct);

router.post("/", verifyToken, isAdmin, createProduct);
router.put("/:id", verifyToken, isAdmin, updateProduct);
router.delete("/:id", verifyToken, isAdmin, deleteProduct);

export default router;