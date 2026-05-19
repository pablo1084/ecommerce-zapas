import User from "../models/UserModel.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import { transporter } from "../config/mailer.js";
import path from "path";
import { fileURLToPath } from "url";

export const getAdminStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const products = await Product.countDocuments();
    const orders = await Order.countDocuments();
    const paidOrders = await Order.find({
      status: "paid",
    });

    const revenue = paidOrders.reduce((acc, order) => acc + order.total, 0);

    res.json({
      users,
      products,
      orders,
      revenue,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "Error al obtener estadísticas",
    });
  }
};

export const getRecentOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "name email");

    res.json(orders);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "Error al obtener órdenes",
    });
  }
};

export const getSalesAnalytics = async (req, res) => {
  try {
    const sales = await Order.aggregate([
      {
        $match: {
          status: "paid",
        },
      },

      {
        $group: {
          _id: {
            month: {
              $month: "$createdAt",
            },
          },
          total: {
            $sum: "$total",
          },
        },
      },

      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);

    res.json(sales);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "Error analytics",
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("user", "name email");

    res.json(orders);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "Error al obtener órdenes",
    });
  }
};

export const updateOrderStatus = async (req, res) => {

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  try {
    const { id } = req.params;

    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "paid",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        msg: "Estado inválido",
      });
    }

    const order = await Order.findById(id);
    await order.populate("user");
    if (!order) {
      return res.status(404).json({
        msg: "Orden no encontrada",
      });
    }

    order.status = status;

    await order.save();

    res.json({
      msg: "Estado actualizado",
      order,
    });

    if (status === "shipped") {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,

        to: order.user.email,

        subject: "Tu pedido fue enviado 📦",

        attachments: [
  {
    filename: "logo.png",
    path: path.join(
      __dirname,
      "../../client/public/logo.png"
    ),
    cid: "logo"
  }
],

        html: `

        <div style="
  background: black;
  padding: 20px;
  text-align: center;
">

  <img
    src="cid:logo"
    width="120"
    alt="Logo"
  />

</div>

      <h1>
        Pedido enviado 📦
      </h1>

      <p>
        Hola ${order.user.name},
      </p>

      <p>
        Tu orden ya fue enviada.
      </p>

      <p>
        Orden:
        #${order._id}
      </p>

    `,
      });
    }

    if (status === "delivered") {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,

        to: order.user.email,

        subject: "Pedido entregado ✅",

        attachments: [
  {
    filename: "logo.png",
    path: path.join(
      __dirname,
      "../../client/public/logo.png"
    ),
    cid: "logo"
  }
],

        html: `

        <div style="
  background: black;
  padding: 20px;
  text-align: center;
">

  <img
    src="cid:logo"
    width="120"
    alt="Logo"
  />

</div>

      <h1>
        Pedido entregado ✅
      </h1>

      <p>
        Hola ${order.user.name},
      </p>

      <p>
        Tu compra fue entregada.
      </p>

      <p>
        Gracias por comprar
        en Zapas Store.
      </p>

    `,
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "Error al actualizar estado",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "Error obteniendo usuarios",
    });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;

    const { role } = req.body;

    const allowedRoles = ["user", "admin"];

    // evitar crear superadmins
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        msg: "Rol inválido",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        msg: "Usuario no encontrado",
      });
    }

    // proteger superadmin
    if (user.role === "superadmin") {
      return res.status(403).json({
        msg: "No podés modificar un superadmin",
      });
    }

    user.role = role;

    await user.save();

    res.json({
      msg: "Rol actualizado",
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "Error actualizando rol",
    });
  }
};

export const toggleBlockUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        msg: "Usuario no encontrado",
      });
    }

    // proteger superadmin
    if (user.role === "superadmin") {
      return res.status(403).json({
        msg: "No podés bloquear un superadmin",
      });
    }

    user.isBlocked = !user.isBlocked;

    await user.save();

    res.json({
      msg: user.isBlocked ? "Usuario bloqueado" : "Usuario desbloqueado",
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "Error cambiando bloqueo",
    });
  }
};
