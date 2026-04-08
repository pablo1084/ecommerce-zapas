import express from "express";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

//Endpoint user//
router.get("/user", verifyToken, (req, res) => {
  res.json({ message: "Acceso permitido (usuario)", user: req.user });
});

//Endpoint admin//
router.get("/admin", verifyToken, isAdmin, (req, res) => {
  res.json({ message: "Acceso permitido (admin)" });
});

export default router;