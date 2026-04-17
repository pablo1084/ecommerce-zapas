function Orders({ orders }) {
  return (
    <section className="orders">
      <h2>Mis Órdenes</h2>

      {orders.length === 0 && <p>No hay órdenes</p>}

      {orders.map((order) => (
        <div key={order._id} className="order-card">

          <div className="order-header">
            <p><strong>Total:</strong> ${order.total}</p>
            <span className={`status ${order.status}`}>
              {order.status}
            </span>
          </div>

          <div className="order-items">
            {order.items.map((item, index) => (
              <div key={index} className="order-item">
                <div>
                  <p className="product-name">{item.name}</p>
                  <p className="product-qty">Cantidad: {item.quantity}</p>
                </div>

                <p className="product-price">
                  ${item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

        </div>
      ))}
    </section>
  );
}

export default Orders;