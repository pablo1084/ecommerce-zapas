import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";

// Credenciales Admin
// email: admin@tienda.com
// password: admin123

export const createAdmin = async () => {
  try {
    const adminEmail = "admin@tienda.com";

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("Admin ya existe");
      return;
    }

    const hash = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Admin",
      email: adminEmail,
      password: hash,
      role: "superadmin"
    });

    console.log("superadmin creado automáticamente");
  } catch (error) {
    console.error("Error creando superadmin:", error);
  }
};