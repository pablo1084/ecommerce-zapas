import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate({
      path: "items.product",
      match: { isActive: true }
    });

    //------------------------------Seccion Carrito--------------------------------------------------
    // Si no existe carrito → crearlo
    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: []
      });
    }

    // Filtrar productos inválidos (ej: borrados o inactivos)
    cart.items = cart.items.filter(item => item.product !== null);

    // Formatear respuesta con subtotales
    const formattedItems = cart.items.map(item => {
      const subtotal = item.product.price * item.quantity;

      return {
        product: {
          _id: item.product._id,
          name: item.product.name,
          price: item.product.price,
          images: item.product.images
        },
        quantity: item.quantity,
        subtotal
      };
    });

    // Total
    const total = formattedItems.reduce((acc, item) => acc + item.subtotal, 0);

    res.json({
      items: formattedItems,
      total
    });

  } catch (error) {
    res.status(500).json({ msg: "Error al obtener el carrito" });
  }
};

//---------------------------------------------Seccion Agregado primer Item----------------------------------------
// ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Validación básica
    if (!productId || !quantity) {
      return res.status(400).json({ msg: "Datos incompletos" });
    }

    if (quantity <= 0) {
      return res.status(400).json({ msg: "Cantidad inválida" });
    }

    // Buscar producto
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    // Validar activo
    if (!product.isActive) {
      return res.status(400).json({ msg: "Producto no disponible" });
    }

    // Validar stock
    if (product.stock < quantity) {
      return res.status(400).json({ msg: "Stock insuficiente" });
    }

    // Buscar carrito
    let cart = await Cart.findOne({ user: req.user.id });

    // Si no existe → crear
    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: []
      });
    }

    // Ver si el producto ya está
    const existingItem = cart.items.find(
      item => item.product.toString() === productId
    );

    if (existingItem) {
      // Sumar cantidad
      const newQuantity = existingItem.quantity + quantity;

      // Validar stock otra vez
      if (product.stock < newQuantity) {
        return res.status(400).json({ msg: "Stock insuficiente" });
      }

      existingItem.quantity = newQuantity;

    } else {
      // Agregar nuevo item
      cart.items.push({
        product: productId,
        quantity
      });
    }

    await cart.save();

    res.json({ msg: "Producto agregado al carrito" });

  } catch (error) {
    res.status(500).json({ msg: "Error al agregar al carrito" });
  }
};

//----------------------------------------Seccion Manipulacion Items--------------------------------------------
//Update Item
export const updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (quantity === undefined) {
      return res.status(400).json({ msg: "Cantidad requerida" });
    }

    // Buscar producto
    const product = await Product.findById(productId);

    if (!product || !product.isActive) {
      return res.status(404).json({ msg: "Producto no disponible" });
    }

    // Validar stock
    if (quantity > product.stock) {
      return res.status(400).json({ msg: "Stock insuficiente" });
    }

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ msg: "Carrito no encontrado" });
    }

    const item = cart.items.find(
      i => i.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ msg: "Producto no está en el carrito" });
    }

    // Si quantity = 0 → eliminar
    if (quantity === 0) {
      cart.items = cart.items.filter(
        i => i.product.toString() !== productId
      );
    } else {
      item.quantity = quantity;
    }

    await cart.save();

    res.json({ msg: "Carrito actualizado" });

  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar carrito" });
  }
};

//Remove Item
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ msg: "Carrito no encontrado" });
    }

    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );

    await cart.save();

    res.json({ msg: "Producto eliminado del carrito" });

  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar producto" });
  }
};

//Clear Cart
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ msg: "Carrito no encontrado" });
    }

    cart.items = [];
    await cart.save();

    res.json({ msg: "Carrito vaciado" });

  } catch (error) {
    res.status(500).json({ msg: "Error al vaciar carrito" });
  }
};