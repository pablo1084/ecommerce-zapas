import { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import ShopToolbar from "../components/ShopToolbar";

const Shop = ({ addToCart }) => {
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // fetch productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams({
          search,
          min: minPrice,
          max: maxPrice,
          category,
          page
        });

        const res = await fetch(
          `http://localhost:3000/api/products?${params}`
        );

        const data = await res.json();

        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, minPrice, maxPrice, category, page]);

  // reset página cuando cambian filtros
  useEffect(() => {
    setPage(1);
  }, [search, minPrice, maxPrice, category]);

  return (
    <div className="home-layout">

      {/* TOOLBAR */}
      <ShopToolbar
        search={search}
        setSearch={setSearch}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        category={category}
        setCategory={setCategory}
        clearFilters={() => {
          setSearch("");
          setMinPrice("");
          setMaxPrice("");
          setCategory("");
        }}
      />

      {/* CONTENIDO */}
      {!loading && products.length === 0 ? (
        <p className="no-results">
          😕 No encontramos productos
        </p>
      ) : (
        <ProductList
          products={products}
          addToCart={addToCart}
          loading={loading}
        />
      )}

      {/* PAGINACIÓN */}
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          ⬅
        </button>

        <span>
          Página {page} de {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          ➡
        </button>
      </div>

    </div>
  );
};

export default Shop;