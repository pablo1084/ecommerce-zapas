import { useState } from "react";
import ProductList from "../components/ProductList";
import ShopToolbar from "../components/ShopToolbar";

const Shop = ({ products, addToCart, loading }) => {
    const [search, setSearch] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [category, setCategory] = useState("");
  

  const filteredProducts = products.filter((product) => {
  const matchName = product.name
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchMin = minPrice ? product.price >= Number(minPrice) : true;
  const matchMax = maxPrice ? product.price <= Number(maxPrice) : true;

  const matchCategory = category
    ? product.category === category
    : true;

  return matchName && matchMin && matchMax && matchCategory;
});

  return (
    <div className="home-layout">
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
      {/* LISTA */}
      {!loading && filteredProducts.length === 0 ? (
  <p className="no-results">
  😕 No encontramos productos
</p>
) : (
  <ProductList
    products={filteredProducts}
    addToCart={addToCart}
    loading={loading}
  />
)}
    </div>
  );
};

export default Shop;