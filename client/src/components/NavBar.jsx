import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
      <Link to="/">Productos</Link>
      <Link to="/orders">Órdenes</Link>
    </nav>
  );
}

export default Navbar;