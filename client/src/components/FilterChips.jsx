import "../styles/filterchips.css";

const FilterChips = ({
  search,
  minPrice,
  maxPrice,
  category,
  setSearch,
  setMinPrice,
  setMaxPrice,
  setCategory
}) => {
  return (
    <div className="filter-chips">

      {/* 🔍 búsqueda */}
      {search && (
        <div className="chip">
          🔍 {search}
          <span onClick={() => setSearch("")}>✖</span>
        </div>
      )}

      {/* 💰 precio */}
      {(minPrice || maxPrice) && (
        <div className="chip">
          💰 {minPrice || 0} - {maxPrice || "∞"}
          <span onClick={() => {
            setMinPrice("");
            setMaxPrice("");
          }}>✖</span>
        </div>
      )}

      {/* 🏷️ categoría */}
      {category && (
        <div className="chip">
          🏷️ {category}
          <span onClick={() => setCategory("")}>✖</span>
        </div>
      )}

    </div>
  );
};

export default FilterChips;