import { Preference } from "mercadopago";
import { Payment } from "mercadopago";
import { client } from "../config/mercadopago.js";
import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

export const createPreference = async (req, res) => {
  try {

    const { items, orderId } = req.body;

    const preference = new Preference(client);

    const response = await preference.create({
      body: {

        items: items.map(item => ({
  title: item.name,
  quantity: Number(item.quantity),
  unit_price: Number(item.price),
  currency_id: "ARS"
})),

notification_url:
  "https://comma-atop-helping.ngrok-free.dev/api/payments/webhook",

        external_reference: orderId,

        back_urls: {
  success: "http://localhost:5173/payment-success",
  failure: "http://localhost:5173/payment-failure",
  pending: "http://localhost:5173/payment-pending"
}
      }
    });

    res.json({
      init_point: response.init_point
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error al crear la preferencia de pago"
    });
  }
};

export const paymentWebhook = async (req, res) => {

  try {

    console.log("🔔 WEBHOOK RECIBIDO");

    const paymentId = req.query.id;

    const topic = req.query.topic;

    if (topic !== "payment") {
      return res.sendStatus(200);
    }

    const payment = new Payment(client);

    const paymentData = await payment.get({
      id: paymentId
    });
console.log(
  JSON.stringify(paymentData, null, 2)
);
    // Estado aprobado
    if (paymentData.status === "approved") {

      const orderId = paymentData.external_reference;

console.log("🧾 ORDER ID:", orderId);

// Buscar orden
const order = await Order.findById(orderId);

if (!order) {

  console.log("❌ Orden no encontrada");

  return res.sendStatus(404);
}

// Evitar duplicados
if (order.status === "paid") {

  console.log("⚠️ ORDEN YA PAGADA");

  return res.sendStatus(200);
}

// Validar stock antes de descontar
for (const item of order.items) {

  const product = await Product.findById(item.product);

  if (!product || !product.isActive) {

    order.status = "cancelled";

    await order.save();

    console.log("❌ Producto inválido");

    return res.sendStatus(200);
  }

  if (product.stock < item.quantity) {

    order.status = "cancelled";

    await order.save();

    console.log("❌ Stock insuficiente");

    return res.sendStatus(200);
  }
}

// Descontar stock
for (const item of order.items) {

  await Product.findByIdAndUpdate(
    item.product,
    {
      $inc: {
        stock: -item.quantity
      }
    }
  );
}

// Vaciar carrito
await Cart.findOneAndUpdate(
  { user: order.user },
  {
    items: []
  }
);

// Orden pagada
order.status = "paid";

order.paymentId = paymentId;

await order.save();

console.log("✅ ORDEN MARCADA COMO PAID");
    }

if (
  paymentData.status === "rejected" ||
  paymentData.status === "cancelled"
) {

  const orderId = paymentData.external_reference;

  const order = await Order.findById(orderId);

  if (order && order.status !== "paid") {

    order.status = "rejected";

    await order.save();

    console.log("❌ PAGO RECHAZADO");
  }
}

    res.sendStatus(200);

  } catch (error) {

    console.log("🔴 ERROR WEBHOOK:");
    console.log(error);

    res.sendStatus(500);
  }
};