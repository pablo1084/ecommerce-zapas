import { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/usermenu.css"

const UserMenu = ({ closeSidebar }) => {
  const { user, logout, isAuth } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  const handleNavigation = () => {
    setOpen(false);
    closeSidebar?.();
  };

  // cerrar al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // si no está logueado no renderiza nada
  if (!isAuth) return null;

  if (!user) {
    return <div style={{ color: "white" }}>Cargando...</div>;
  }

  return (
  <div className="user-menu-container" ref={menuRef}>
    <button className="user-button" onClick={() => setOpen(!open)}>
      <div className="avatar">
        {user.name?.charAt(0).toUpperCase()}
      </div>
      <span className="user-label">Mi sesión</span>
      <span className={`arrow ${open ? "open" : ""}`}>▼</span>
    </button>

    {/* dropdown inline */}
    {open && (
      <div className="user-dropdown">
        <button className="close-btn" onClick={() => setOpen(false)}>✖</button>

        <div className="user-info">
          <div className="avatar big">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="user-name">{user.name}</p>
            <p className="user-email">{user.email}</p>
          </div>
        </div>

        <hr />

        <div className="user-links">
          <Link to="/orders" onClick={handleNavigation}>📦 Mis órdenes</Link>
          <Link to="/profile" onClick={handleNavigation}>👤 Mi perfil</Link>
        </div>

        <hr />

        <button className="logout-btn" onClick={() => { setOpen(false); logout(); }}>
          🚪 Cerrar sesión
        </button>
      </div>
    )}
  </div>
);
};

export default UserMenu;