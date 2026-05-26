import { useEffect, useState } from "react";
import api from "../../api/axios";
import "../../styles/admindashboard.css"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

function AdminDashboard() {

  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {

    const fetchData = async () => {

        const salesRes = await api.get(
  "/admin/sales-analytics"
);

const months = [
  "",
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic"
];

const formatted = salesRes.data.map(
  (item) => ({
    month: months[item._id.month],
    total: item.total
  })
);

setSalesData(formatted);

      try {

        const statsRes = await api.get("/admin/stats");

        setStats(statsRes.data);

        const ordersRes = await api.get(
          "/admin/recent-orders"
        );

        setRecentOrders(ordersRes.data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchData();

  }, []);

  return (
    <div className="dashboard-container">

      <h2 className="dashboard-title">
        Dashboard
      </h2>

      <div className="dashboard-grid">

        <div className="sales-chart">

  <h3>Ventas mensuales</h3>

  <ResponsiveContainer
    width="100%"
    height={300}
  >

    <LineChart data={salesData}>

      <XAxis dataKey="month" />

      <YAxis />

      <Tooltip />

      <Line
        type="monotone"
        dataKey="total"
        strokeWidth={3}
      />

    </LineChart>

  </ResponsiveContainer>

</div>

        <div className="dashboard-card">
          <h3>👥 Usuarios</h3>
          <p>{stats.users}</p>
        </div>

        <div className="dashboard-card">
          <h3>📦 Productos</h3>
          <p>{stats.products}</p>
        </div>

        <div className="dashboard-card">
          <h3>🧾 Órdenes</h3>
          <p>{stats.orders}</p>
        </div>

        <div className="dashboard-card">
          <h3>💰 Ventas</h3>
          <p>${stats.revenue}</p>
        </div>

      </div>

      <div className="recent-orders">

        <h3>Últimas órdenes</h3>

        <div className="recent-orders-list">

          {recentOrders.map((order) => (

            <div
              key={order._id}
              className="recent-order-card"
            >

              <div>
                <strong>
                  {order.user?.name}
                </strong>

                <p>
                  {order.user?.email}
                </p>
              </div>

              <div>
                <p>
                  ${order.total}
                </p>

                <span className={`status ${order.status}`}>
                  {order.status}
                </span>
              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;