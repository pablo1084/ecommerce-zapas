import { FaSearch } from "react-icons/fa";
import "../styles/shoptoolbar.css";

const ShopToolbar = ({
  search,
  setSearch,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  category,
  setCategory,
  clearFilters
}) => {
  return (
    <div className="shop-toolbar">

      {/* 🔍 BUSCADOR */}
      <div className="search-box">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 💰 PRECIO */}
      <input
        type="number"
        placeholder="Min $"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />

      <input
        type="number"
        placeholder="Max $"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      {/* 🏷️ CATEGORÍA */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Categorías</option>
        <option value="adidas">Adidas</option>
        <option value="nike">Nike</option>
      </select>

      {/* ❌ LIMPIAR */}
      <button className="clear-btn-bar" onClick={clearFilters}>
        Limpiar
      </button>
    </div>
  );
};

export default ShopToolbar;