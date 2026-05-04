import { useState } from "react";
import ProductList from "../components/ProductList";

const Shop = ({ products, addToCart, loading }) => {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-layout">
        {/* BUSCADOR */}
      
    <div className="shop-header">
  <input
        type="text"
        placeholder="Buscar productos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
  <h1 className="title">Productos</h1>
</div>

      {/* MENSAJE SIN RESULTADOS */}
      {filteredProducts.length === 0 && (
        <p style={{ marginTop: "10px" }}>
          No se encontraron productos
        </p>
      )}

      {/* LISTA */}
      <ProductList
        products={filteredProducts}
        addToCart={addToCart}
        loading={loading}
      />
    </div>
  );
};

export default Shop;