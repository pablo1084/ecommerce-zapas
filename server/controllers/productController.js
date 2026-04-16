import Product from "../models/productModel.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const uploadProductImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No se envió imagen" });
    }

    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await streamUpload();

    res.json({ url: result.secure_url });

  } catch (error) {
    res.status(500).json({ msg: "Error subiendo imagen" });
  }
};

export const addImageToProduct = async (req, res) => {
  try {
    const { productId, imageUrl } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    product.images.push(imageUrl);

    await product.save();

    res.json({ msg: "Imagen agregada", product });

  } catch (error) {
    res.status(500).json({ msg: "Error al guardar imagen" });
  }
};

// Crear producto (admin)
export const createProduct = async (req, res) => {
  try {
    const { name, price, sku } = req.body;

    // Validaciones básicas
    if (!name || !price) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    // Evitar SKU duplicado
    if (sku) {
      const existingSKU = await Product.findOne({ sku });
      if (existingSKU) {
        return res.status(400).json({ error: "SKU ya existe" });
      }
    }

    const product = await Product.create(req.body);

    res.status(201).json(product);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear producto" });
  }
};

// Obtener todos (user)
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true });

    const formattedProducts = products.map(p => ({
      ...p.toObject(),
      stockStatus: p.stock === 0 ? "Sin stock" : "Disponible"
    }));

    res.json(formattedProducts);

  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

//Obtener todos (admin)
export const getAllProductsAdmin = async (req, res) => {
  try {
    const products = await Product.find();

    const formattedProducts = products.map(p => ({
      ...p.toObject(),
      stockStatus: p.stock === 0 ? "Sin stock" : "Disponible"
    }));

    res.json(formattedProducts);

  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

// Obtener uno (Id)
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product || !product.isActive) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const formattedProduct = {
      ...product.toObject(),
      stockStatus: product.stock === 0 ? "Sin stock" : "Disponible"
    };

    res.json(formattedProduct);

  } catch (error) {
    res.status(500).json({ error: "Error al obtener producto" });
  }
};

// Actualizar (admin)
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // evita tocar campos sensibles
    const allowedFields = [
      "name",
      "description",
      "price",
      "stock",
      "category",
      "attributes",
      "images",
      "isActive"
    ];

    Object.keys(req.body).forEach(key => {
      if (allowedFields.includes(key)) {
        product[key] = req.body[key];
      }
    });

    await product.save();

    res.json(product);

  } catch (error) {
    res.status(500).json({ error: "Error al actualizar producto" });
  }
};

// Eliminar (admin)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    if (!product.isActive) {
      return res.json({ message: "El producto ya está desactivado" });
    }

    product.isActive = false;
    await product.save();

    res.json({ message: "Producto desactivado correctamente" });

  } catch (error) {
    res.status(500).json({ error: "Error al eliminar producto" });
  }
};