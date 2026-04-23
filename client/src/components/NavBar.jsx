import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { BsBag } from "react-icons/bs";
import Cart from "./Cart";

function Navbar({ cart, checkout, removeFromCart, updateQuantity, clearCart }) {
  
  const { isAuth, logout } = useContext(AuthContext);
const { getTotalItems } = useContext(CartContext);

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const totalItems = getTotalItems();

  const [showCart, setShowCart] = useState(false);

const toggleCart = () => {
  setShowCart(!showCart);
};

 useEffect(() => {
  if (totalItems === 0) return;
  const timer1 = setTimeout(() => {
    setAnimate(true);
  }, 0);

  const timer2 = setTimeout(() => {
    setAnimate(false);
  }, 300);

  return () => {
    clearTimeout(timer1);
    clearTimeout(timer2);
  };
}, [totalItems]);

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

<Link to="/" className="navbar-logo">
        <img src={logo} alt="Zapas" />
      </Link>

        <h2 className="logo" onClick={() => navigate("/")}>
          Urban Store
        </h2>

<div id="cart-icon" className="cart-container" onClick={toggleCart}>
  <BsBag />

  {totalItems > 0 && (
    <span className={`cart-badge ${animate ? "pop" : ""}`}>
      {totalItems}
    </span>
  )}
</div>

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

      {showCart && (
  <div className="cart-panel">
    <Cart
      cart={cart}
      checkout={checkout}
      removeFromCart={removeFromCart}
      updateQuantity={updateQuantity}
      clearCart={clearCart}
    />
  </div>
)}

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