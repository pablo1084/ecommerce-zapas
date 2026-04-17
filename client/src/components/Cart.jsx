function Cart({ cart, checkout, removeFromCart, updateQuantity, clearCart }) {
  const hasItems = cart?.items?.length > 0;

  return (
    <section className="cart">
      <h2>Carrito</h2>

      {!hasItems && <p className="empty">Tu carrito está vacío</p>}

      {hasItems && (
        <>
          <div className="cart-items">
            {cart.items.map((item) => (
              <div key={item.product._id} className="cart-item">
                
                <div>
                  <p className="name">{item.product.name}</p>

                  <div className="qty-controls">
                    <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)}>
                      ➖
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)}>
                      ➕
                    </button>
                  </div>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.product._id)}
                >
                  ❌
                </button>

              </div>
            ))}
          </div>

          <button className="checkout-btn" onClick={checkout}>
            Finalizar compra
          </button>
          <button className="clear-btn" onClick={clearCart}>
      Vaciar carrito
    </button>
        </>
      )}
    </section>
  );}

export default Cart;