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