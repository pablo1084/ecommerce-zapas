import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // 🔥 Validación básica
      if (!name || !email || !password) {
        return res.status(400).json({ error: "Faltan datos" });
      }
  
      // 🔍 Verificar si el usuario ya existe
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ error: "El usuario ya existe" });
      }
  
      // 🔐 Encriptar contraseña
      const hash = await bcrypt.hash(password, 10);
  
      // 💾 Crear usuario
      const user = await User.create({
        name,
        email,
        password: hash
      });
  
      // 🚫 No devolver password
      const { password: _, ...userData } = user._doc;
  
      res.status(201).json(userData);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al registrar usuario" });
    }
  };

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validación
      if (!email || !password) {
        return res.status(400).json({ error: "Faltan datos" });
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: "Usuario no existe" });
      }
  
      const valid = await bcrypt.compare(password, user.password);
  
      if (!valid) {
        return res.status(401).json({ error: "Password incorrecta" });
      }
  
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
  
      res.json({ token });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error en login" });
    }
  };

  // make-Admin
export const makeAdmin = async (req, res) => {
  try {
    const { userId } = req.body;

    // Buscar usuario
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verificar si ya es admin
    if (user.role === "admin") {
      return res.json({ message: "El usuario ya es admin" });
    }

    // Actualizar rol
    user.role = "admin";
    await user.save();

    res.json({ message: "Usuario promovido a admin", user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al cambiar rol" });
  }
};