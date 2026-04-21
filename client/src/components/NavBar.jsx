import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";


function Navbar() {
  const { isAuth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleAuth = () => {
    if (isAuth) {
      logout();
      navigate("/");
    } else {
      navigate("/login");
    }
    setOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <h2 className="logo" onClick={() => navigate("/")}>
          Urban Store
        </h2>

<Link to="/" className="navbar-logo">
        <img src={logo} alt="Zapas" />
      </Link>

        {/* HAMBURGUESA */}
        <div
          className={`hamburger ${open ? "active" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </div>
      </nav>

      {/* OVERLAY */}
      <div
        className={`overlay ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      />

      {/* MENÚ LATERAL */}
      <div className={`side-menu ${open ? "open" : ""}`}>
        <Link to="/shop" onClick={() => setOpen(false)}>
          Productos
        </Link>

        {isAuth && (
          <Link to="/orders" onClick={() => setOpen(false)}>
            Órdenes
          </Link>
        )}

        <button
          className={`auth-btn ${isAuth ? "logout" : ""}`}
          onClick={handleAuth}
        >
          {isAuth ? "Cerrar sesión" : "Iniciar sesión"}
        </button>
      </div>
    </>
  );
}

export default Navbar;