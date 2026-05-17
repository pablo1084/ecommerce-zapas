import User from "../models/UserModel.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";

export const getAdminStats = async (req, res) => {

  try {

    const users = await User.countDocuments();

    const products = await Product.countDocuments();

    const orders = await Order.countDocuments();

    const paidOrders = await Order.find({
      status: "paid"
    });

    const revenue = paidOrders.reduce(
      (acc, order) => acc + order.total,
      0
    );

    res.json({
      users,
      products,
      orders,
      revenue
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      msg: "Error al obtener estadísticas"
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
      msg: "Error al obtener órdenes"
    });
  }
};

export const getSalesAnalytics = async (req, res) => {

  try {

    const sales = await Order.aggregate([

      {
        $match: {
          status: "paid"
        }
      },

      {
        $group: {
          _id: {
            month: {
              $month: "$createdAt"
            }
          },
          total: {
            $sum: "$total"
          }
        }
      },

      {
        $sort: {
          "_id.month": 1
        }
      }

    ]);

    res.json(sales);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      msg: "Error analytics"
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
      msg: "Error al obtener órdenes"
    });
  }
};

export const updateOrderStatus = async (req, res) => {

  try {

    const { id } = req.params;

    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "paid",
      "shipped",
      "delivered",
      "cancelled"
    ];

    if (!allowedStatuses.includes(status)) {

      return res.status(400).json({
        msg: "Estado inválido"
      });
    }

    const order = await Order.findById(id);

    if (!order) {

      return res.status(404).json({
        msg: "Orden no encontrada"
      });
    }

    order.status = status;

    await order.save();

    res.json({
      msg: "Estado actualizado",
      order
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      msg: "Error al actualizar estado"
    });
  }
};

export const getAllUsers = async (
  req,
  res
) => {

  try {

    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(users);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      msg: "Error obteniendo usuarios"
    });
  }
};

export const updateUserRole = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const { role } = req.body;

    const allowedRoles = [
      "user",
      "admin"
    ];

    // evitar crear superadmins
    if (
      !allowedRoles.includes(role)
    ) {

      return res.status(400).json({
        msg: "Rol inválido"
      });
    }

    const user = await User.findById(id);

    if (!user) {

      return res.status(404).json({
        msg: "Usuario no encontrado"
      });
    }

    // proteger superadmin
    if (
      user.role === "superadmin"
    ) {

      return res.status(403).json({
        msg:
          "No podés modificar un superadmin"
      });
    }

    user.role = role;

    await user.save();

    res.json({
      msg: "Rol actualizado",
      user
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      msg: "Error actualizando rol"
    });
  }
};