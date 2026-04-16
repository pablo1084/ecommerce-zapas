function ProductList({ products, addToCart }) {
  return (
    <section>
      <h1 className="title">Productos</h1>

      <div className="product-grid">
        {products.map((p) => (
          <div key={p._id} className="product-card">
            
            <img
              src={p.images?.[0] || "https://via.placeholder.com/200"}
              alt={p.name}
            />

            <h3>{p.name}</h3>
            <p className="price">${p.price}</p>

            <button onClick={() => addToCart(p._id)}>
              Agregar al carrito
            </button>

          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductList;