import { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import "../../styles/adminorders.css"

function AdminOrders() {

  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] =
  useState("all");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] =
  useState(null);
  const [currentPage, setCurrentPage] =
  useState(1);

const ordersPerPage = 8;

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

  const handleStatusChange = async (
  orderId,
  newStatus
) => {

  try {

    await api.put(
      `/admin/orders/${orderId}`,
      {
        status: newStatus
      }
    );

    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId
          ? {
              ...order,
              status: newStatus
            }
          : order
      )
    );

    if (
  selectedOrder?._id === orderId
) {

  setSelectedOrder((prev) => ({
    ...prev,
    status: newStatus
  }));
}

    toast.success("Estado actualizado");

  } catch (error) {

    console.log(error);

    toast.error("Error al actualizar");
  }
};

  const filteredOrders = orders.filter(
  (order) => {

    const matchesStatus =
      statusFilter === "all"
        ? true
        : order.status === statusFilter;

    const searchLower =
      search.toLowerCase();

    const matchesSearch =
      order.user?.name
        ?.toLowerCase()
        .includes(searchLower)

      ||

      order.user?.email
        ?.toLowerCase()
        .includes(searchLower)

      ||

      order._id
        .toLowerCase()
        .includes(searchLower);

    return (
      matchesStatus &&
      matchesSearch
    );
  }
);

const indexOfLastOrder =
  currentPage * ordersPerPage;

const indexOfFirstOrder =
  indexOfLastOrder - ordersPerPage;

const currentOrders =
  filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

const totalPages = Math.ceil(
  filteredOrders.length /
  ordersPerPage
);

  return (
    <div className="admin-orders">

      <h2>Gestión de órdenes</h2>

      <input
  type="text"
  placeholder="Buscar por cliente, email o ID..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  className="orders-search"
/>

<div className="orders-filters">

  <button onClick={() => setStatusFilter("all")}>
    Todas
  </button>

  <button onClick={() => setStatusFilter("pending")}>
    Pending
  </button>

  <button onClick={() => setStatusFilter("paid")}>
    Paid
  </button>

  <button onClick={() => setStatusFilter("shipped")}>
    Shipped
  </button>

  <button onClick={() => setStatusFilter("delivered")}>
    Delivered
  </button>

  <button onClick={() => setStatusFilter("cancelled")}>
    Cancelled
  </button>

</div>

      <div className="orders-table">

        <div className="orders-header">
          <span>Cliente</span>
          <span>Total</span>
          <span>Estado</span>
          <span>Pago</span>
          <span>Fecha</span>
        </div>

        {currentOrders.map((order) => (

          <div
  key={order._id}
  className="orders-row"
>

           <span
  className="order-user"
  onClick={() =>
    setSelectedOrder(order)
  }
>

  {order.user?.name}

</span>

            <span>
              ${order.total}
            </span>

            <select
  value={order.status}
  onChange={(e) =>
    handleStatusChange(
      order._id,
      e.target.value
    )
  }
  className={`status-select ${order.status}`}
>

  <option value="pending">
    Pending
  </option>

  <option value="paid">
    Paid
  </option>

  <option value="shipped">
    Shipped
  </option>

  <option value="delivered">
    Delivered
  </option>

  <option value="cancelled">
    Cancelled
  </option>

</select>

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

      <div className="pagination">

  <button
    disabled={currentPage === 1}
    onClick={() =>
      setCurrentPage((prev) =>
        prev - 1
      )
    }
  >
    ←
  </button>

  <span>
    Página {currentPage} de {totalPages}
  </span>

  <button
    disabled={
      currentPage === totalPages
    }
    onClick={() =>
      setCurrentPage((prev) =>
        prev + 1
      )
    }
  >
    →
  </button>

</div>

      {/* Modal */}
      {selectedOrder && (

  <div
    className="order-modal-overlay"
    onClick={() =>
      setSelectedOrder(null)
    }
  >

    <div
      className="order-modal"
      onClick={(e) =>
        e.stopPropagation()
      }
    >

      <h2>Detalle de orden</h2>

      <p>
        <strong>Cliente:</strong>{" "}
        {selectedOrder.user?.name}
      </p>

      <p>
        <strong>Email:</strong>{" "}
        {selectedOrder.user?.email}
      </p>

      <p>
        <strong>Estado:</strong>{" "}
        {selectedOrder.status}
      </p>

      <p>
        <strong>Pago:</strong>{" "}
        {selectedOrder.paymentStatus}
      </p>

      <p>
        <strong>Total:</strong> $
        {selectedOrder.total}
      </p>

      <p>
        <strong>Payment ID:</strong>{" "}
        {selectedOrder.paymentId || "N/A"}
      </p>

      <p>
        <strong>Fecha:</strong>{" "}
        {new Date(
          selectedOrder.createdAt
        ).toLocaleString()}
      </p>

      <h3>Productos</h3>

      <div className="modal-products">

        {selectedOrder.items.map(
          (item, index) => (

            <div
              key={index}
              className="modal-product"
            >

              <span>
                {item.name}
              </span>

              <span>
                x{item.quantity}
              </span>

              <span>
                ${item.price}
              </span>

            </div>
          )
        )}

      </div>

      <button
        className="close-modal-btn"
        onClick={() =>
          setSelectedOrder(null)
        }
      >
        Cerrar
      </button>

    </div>

  </div>
)}

    </div>
  );
}

export default AdminOrders;