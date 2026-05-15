import { useEffect, useState } from "react";
import api from "../../api/axios";

function AdminOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const res = await api.get(
          "/admin/orders"
        );

        setOrders(res.data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchOrders();

  }, []);

  return (
    <div className="admin-orders">

      <h2>Gestión de órdenes</h2>

      <div className="orders-table">

        <div className="orders-header">
          <span>Cliente</span>
          <span>Total</span>
          <span>Estado</span>
          <span>Pago</span>
          <span>Fecha</span>
        </div>

        {orders.map((order) => (

          <div
            key={order._id}
            className="orders-row"
          >

            <span>
              {order.user?.name}
            </span>

            <span>
              ${order.total}
            </span>

            <span className={`status ${order.status}`}>
              {order.status}
            </span>

            <span>
              {order.paymentStatus}
            </span>

            <span>
              {new Date(
                order.createdAt
              ).toLocaleDateString()}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}

export default AdminOrders;