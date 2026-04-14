function Orders({ orders }) {
  return (
    <section>
      <h2>Mis órdenes</h2>

      {orders.map((order) => (
        <div key={order._id}>
          <p>Total: ${order.total}</p>
          <p>Estado: {order.status}</p>
        </div>
      ))}
    </section>
  );
}

export default Orders;