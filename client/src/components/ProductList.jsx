import { Oval } from "react-loader-spinner";

function ProductList({ products, addToCart, loading }) {
  
  if (loading) {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "60px" }}>
      <Oval
        height={60}
        width={60}
        color="#000"
        secondaryColor="#ccc"
        strokeWidth={4}
      />
    </div>
  );
}

  return (
    <section>
      <h1 className="title">Productos</h1>

      <div className="product-grid">
        {products.map((p) => (
          <div key={p._id} className="product-card">
            
            <img 
  src={p.images?.[0] || "https://placehold.co/200"} 
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