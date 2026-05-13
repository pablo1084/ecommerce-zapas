import { Preference } from "mercadopago";
import { client } from "../config/mercadopago.js";

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