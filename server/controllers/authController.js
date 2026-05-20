import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { transporter } from "../config/mailer.js";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

export const register = async (req, res) => {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    try {
      const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
      const { name, email, password } = req.body;
  
      // Validación básica
      if (!name || !email || !password) {
        return res.status(400).json({ error: "Faltan datos" });
      }
  
      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ error: "El usuario ya existe" });
      }
  
      // Encriptar contraseña
      const hash = await bcrypt.hash(password, 10);
  
const verificationToken =
  crypto.randomBytes(32).toString("hex");

      // Crear usuario
      const user = await User.create({
  name,
  email,
  password: hash,
  verificationToken
});

await transporter.sendMail({

  from: process.env.EMAIL_USER,

  to: email,

  subject: "Verificá tu cuenta ✅",

  html: `

<div style="
  font-family: Arial;
  max-width: 600px;
  margin: auto;
">

  <div style="
    background: black;
    padding: 20px;
    text-align: center;
  ">

    <img
      src="cid:logo"
      width="120"
    />

  </div>

  <div style="
    padding: 30px;
    background: #f5f5f5;
  ">

    <h1>
      Bienvenido a Zapas Store 👟
    </h1>

    <p>
      Hola ${name},
    </p>

    <p>
      Confirmá tu cuenta haciendo click:
    </p>

    <a
      href="
http://localhost:5173/verify/${verificationToken}
"
      style="
        display: inline-block;
        background: black;
        color: white;
        padding: 12px 20px;
        text-decoration: none;
        border-radius: 8px;
        margin-top: 20px;
      "
    >
      Verificar cuenta
    </a>

  </div>

</div>
`,

  attachments: [
    {
      filename: "logo.png",
      path: path.join(
        __dirname,
        "../../client/public/logo.png"
      ),
      cid: "logo"
    }
  ]
});
  
      // No devolver password
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

      if (user?.isBlocked) {

  return res.status(403).json({
    error:
      "Cuenta bloqueada"
  });
}

if (!user.isVerified) {

  return res.status(401).json({
    msg: "Debes verificar tu email"
  });
}
  
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
        { expiresIn: "1h" }
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

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener usuario" });
  }
};

export const updateMe = async (req, res) => {
  try {
    const { name } = req.body;

    // VALIDACIONES
    if (!name || !name.trim()) {
      return res.status(400).json({ error: "El nombre es obligatorio" });
    }

    if (name.trim().length < 2) {
      return res.status(400).json({ error: "El nombre debe tener al menos 2 caracteres" });
    }

    if (name.trim().length > 50) {
      return res.status(400).json({ error: "El nombre es demasiado largo" });
    }

    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    if (!nameRegex.test(name)) {
      return res.status(400).json({ error: "El nombre solo puede contener letras" });
    }

    // buscar usuario
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // actualizar
    user.name = name.trim();

    await user.save();

    const { password, ...userData } = user._doc;

    res.json(userData);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

export const verifyEmail = async (
  req,
  res
) => {

  try {

    const { token } = req.params;

    const user =
      await User.findOne({
        verificationToken: token
      });

    if (!user) {

      return res.status(400).json({
        msg: "Token inválido"
      });
    }

    if (user.isVerified) {

  return res.status(400).json({
    msg: "Cuenta ya verificada"
  });
}

    user.isVerified = true;

    user.verificationToken = undefined;

    await user.save();

    res.json({
      msg: "Cuenta verificada"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      msg: "Error verificando email"
    });
  }
};