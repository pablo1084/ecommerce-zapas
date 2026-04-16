function Cart({ cart, checkout }) {
  return (
    <section className="cart">
      <h2>Carrito</h2>

      {cart?.items?.length === 0 && (
        <p className="empty-cart">Tu carrito está vacío</p>
      )}

      {cart?.items?.map((item) => (
        <div key={item.product._id} className="cart-item">
          <p className="item-name">{item.product.name}</p>
          <p className="item-qty">Cantidad: {item.quantity}</p>
        </div>
      ))}

      <button
        className="checkout-btn"
        onClick={checkout}
        disabled={!cart?.items?.length}
      >
        Finalizar compra
      </button>
    </section>
  );
}

export default Cart;