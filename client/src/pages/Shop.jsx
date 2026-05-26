import { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import ShopToolbar from "../components/Shop-ToolBar";
import FilterChips from "../components/FilterChips";

const Shop = ({ addToCart }) => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  //debounce
  useEffect(() => {
  const timeout = setTimeout(() => {
    setDebouncedSearch(search);
  }, 400); // tiempo de espera

  return () => clearTimeout(timeout);
}, [search]);

  // fetch productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams({
          search: debouncedSearch,
          min: minPrice,
          max: maxPrice,
          category,
          page
        });

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/products?${params}`
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
  }, [debouncedSearch, minPrice, maxPrice, category, page]);

  // reset página cuando cambian filtros
  useEffect(() => {
    setPage(1);
  }, [search, minPrice, maxPrice, category]);

  const getPages = () => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return pages;
};

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

     {search !== debouncedSearch && (
  <div className="searching-indicator" />
)}

      {/* FILTROS */}
      <FilterChips
  search={search}
  minPrice={minPrice}
  maxPrice={maxPrice}
  category={category}
  setSearch={setSearch}
  setMinPrice={setMinPrice}
  setMaxPrice={setMaxPrice}
  setCategory={setCategory}
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

  {/* ANTERIOR */}
  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
  >
    ⬅
  </button>

  {/* NÚMEROS */}
  {getPages().map((p) => (
    <button
      key={p}
      className={`page-number ${p === page ? "active" : ""}`}
      onClick={() => setPage(p)}
    >
      {p}
    </button>
  ))}

  {/* SIGUIENTE */}
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