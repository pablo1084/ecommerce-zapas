import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";

export const createOrder = async (req, res) => {
  try {
    // Traer carrito con productos
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ msg: "El carrito está vacío" });
    }

// Valida existencia de productos
if (!cart.items.every(item => item.product)) {
  return res.status(400).json({
    msg: "Hay productos inválidos en el carrito"
  });
}

    let total = 0;
    const orderItems = [];

    // Validar todo nuevamente
    for (const item of cart.items) {
      const product = item.product;

      if (!product || !product.isActive) {
        return res.status(400).json({ msg: "Producto no disponible" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ msg: `Stock insuficiente para ${product.name}` });
      }

      // armar item de orden
      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity
      });

      total += product.price * item.quantity;
    }

    // DESCONTAR STOCK
    for (const item of cart.items) {
  const updatedProduct = await Product.findOneAndUpdate(
    {
      _id: item.product._id,
      stock: { $gte: item.quantity }
    },
    {
      $inc: { stock: -item.quantity }
    },
   { returnDocument: "after" }
  );

  if (!updatedProduct) {
    return res.status(400).json({
      msg: `Stock insuficiente para ${item.product.name}`
    });
  }
}

    // Crear orden
    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      total
    });

    // Vaciar carrito
    cart.items = [];
    await cart.save();

    res.status(201).json({
      msg: "Orden creada correctamente",
      order
    });

  } catch (error) {
    res.status(500).json({ msg: "Error al crear orden" });
  }
};

//--------------------------------------HISTORIAL-------------------------------------------------
//Historial de órdenes completo del usuario logueado

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 }); // más recientes primero

    res.json(orders);

  } catch (error) {
    res.status(500).json({ msg: "Error al obtener órdenes" });
  }
};

//Ordenes por Id
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ msg: "Orden no encontrada" });
    }

    // 🔐 seguridad: solo dueño
    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "No autorizado" });
    }

    res.json(order);

  } catch (error) {
    res.status(500).json({ msg: "Error al obtener la orden" });
  }
};