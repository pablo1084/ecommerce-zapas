function Cart({ cart, checkout }) {
  return (
    <section>
      <h2>Carrito</h2>

      {cart?.items?.length === 0 && <p>Carrito vacío</p>}

      {cart?.items?.map((item) => (
        <div key={item.product._id}>
          <p>{item.product.name}</p>
          <p>Cantidad: {item.quantity}</p>
        </div>
      ))}

      <button 
  onClick={checkout}
  disabled={!cart?.items?.length}
>
  Finalizar compra
</button>
    </section>
  );
}

export default Cart;