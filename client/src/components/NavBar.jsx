import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { BsBag } from "react-icons/bs";
import toast from "react-hot-toast";
import Cart from "./Cart";
import UserMenu from "./UserMenu";
import { motion, AnimatePresence } from "framer-motion";

function Navbar({
  cart,
  checkout,
  checkoutLoading,
  removeFromCart,
  updateQuantity,
  clearCart,
}) {
  const { user, isAuth, logout } = useContext(AuthContext);
  const { getTotalItems } = useContext(CartContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const totalItems = getTotalItems();
  const [showCart, setShowCart] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  const toggleCart = () => {
    setOpen(false);
    setShowCart((prev) => !prev);
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
      navigate("/Auth");
    }
    setOpen(false);
  };
  return (
    <>
  <nav className="navbar">

    <div className="navbar-content">

      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Zapas" />
        </Link>

        {(user?.role === "admin" || user?.role === "superadmin") && (
          <div className="admin-dropdown">
            <button
              className="admin-dropdown-btn"
              onClick={() => setShowAdminMenu((prev) => !prev)}
            >
              ⚙ Panel
            </button>

            <AnimatePresence>
              {showAdminMenu && (
                <motion.div
                  className="admin-dropdown-menu"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setShowAdminMenu(false)}
                  >
                    📊 Dashboard
                  </Link>

                  <Link
                    to="/admin/products"
                    onClick={() => setShowAdminMenu(false)}
                  >
                    📦 Productos
                  </Link>

                  <Link
                    to="/admin/orders"
                    onClick={() => setShowAdminMenu(false)}
                  >
                    🧾 Órdenes
                  </Link>

                  <Link
                    to="/admin/products/create"
                    onClick={() => setShowAdminMenu(false)}
                  >
                    ➕ Crear producto
                  </Link>

                  {user?.role === "superadmin" && (
                    <Link
                      to="/super-admin"
                      onClick={() => setShowAdminMenu(false)}
                    >
                      🛡 Super Admin
                    </Link>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      <h2 className="logo" onClick={() => navigate("/")}>
        Urban Store
      </h2>

      <div className="nav-actions">

        <div className="user-cart-group">

          <div className="navbar-user">
            {isAuth && user && (
              <span>
                👋 Hola, {user.name?.split(" ")[0]}
              </span>
            )}
          </div>

          <div
            id="cart-icon"
            className="cart-container"
            onClick={toggleCart}
          >
            <BsBag />

            {totalItems > 0 && (
              <span className={`cart-badge ${animate ? "pop" : ""}`}>
                {totalItems}
              </span>
            )}
          </div>

        </div>

        <div
          className={`hamburger ${open ? "active" : ""}`}
          onClick={() => {
            setShowCart(false);
            setOpen((prev) => !prev);
          }}
        >
          <span />
          <span />
          <span />
        </div>

      </div>

    </div>

  </nav>

      <AnimatePresence>
        {showCart && (
          <div className="cart-overlay" onClick={() => setShowCart(false)}>
            <motion.div
              className="cart-panel"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Cart
                cart={cart}
                checkout={checkout}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                clearCart={clearCart}
                checkoutLoading={checkoutLoading}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* OVERLAY */}
      <div
        className={`overlay ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      />

      {/* MENÚ LATERAL */}
      <div className={`side-menu ${open ? "open" : ""}`}>
        <div className="navbar-right">
          <UserMenu closeSidebar={() => setOpen(false)} />
        </div>
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