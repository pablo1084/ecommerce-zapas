function ProductList({ products, addToCart }) {
  return (
    <section>
      <h1>Productos</h1>

      {products.map((p) => (
        <div key={p._id}>
          <h3>{p.name}</h3>
          <p>${p.price}</p>

          <button onClick={() => addToCart(p._id)}>
            Agregar al carrito
          </button>
        </div>
      ))}
    </section>
  );
}

export default ProductList;