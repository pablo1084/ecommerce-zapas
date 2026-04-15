import { Link } from "react-router-dom";

function Navbar({ logout }) {
  return (
    <nav style={{
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px"
}}>
  <div style={{ display: "flex", gap: "20px" }}>
    <Link to="/">Productos</Link>
    <Link to="/orders">Órdenes</Link>
  </div>

  <button onClick={logout}>
    Cerrar sesión
  </button>
</nav>
  );
}

export default Navbar;