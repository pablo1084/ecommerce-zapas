function Navbar({ logout }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        ZAPAS
      </div>

      <div className="navbar-links">
        <a href="/">Productos</a>
        <a href="/orders">Órdenes</a>
      </div>

      <button onClick={logout} className="logout-btn">
        Cerrar sesión
      </button>
    </nav>
  );
}

export default Navbar;