import Product from "../models/product.js";

// 🔹 Crear producto (admin)
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear producto" });
  }
};

// 🔹 Obtener todos
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

// 🔹 Obtener uno
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener producto" });
  }
};

// 🔹 Actualizar (admin)
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar producto" });
  }
};

// 🔹 Eliminar (admin)
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar producto" });
  }
};