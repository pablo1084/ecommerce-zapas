import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar({ logout }) {
  return (
    <nav className="navbar">
      
      <Link to="/" className="navbar-logo">
        <img src={logo} alt="Zapas" />
      </Link>

      <div className="navbar-links">
        <Link to="/">Productos</Link>
        <Link to="/orders">Órdenes</Link>
      </div>

      <button onClick={logout} className="logout-btn">
        Cerrar sesión
      </button>
    </nav>
  );
}

export default Navbar;