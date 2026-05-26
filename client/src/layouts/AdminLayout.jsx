import { Link, Outlet, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/adminlayout.css"

function AdminLayout() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className={sidebarOpen ? "admin-sidebar open" : "admin-sidebar"}>
        <div className="admin-logo">
          <h2>Admin Panel</h2>
        </div>

        <nav className="admin-nav">
          <Link
            to="/admin/dashboard"
            className={location.pathname === "/admin/dashboard" ? "active" : ""}
          >
            📊 Dashboard
          </Link>

          <Link
            to="/admin/products"
            className={
              location.pathname.includes("/admin/products") ? "active" : ""
            }
          >
            📦 Productos
          </Link>

          <Link
            to="/admin/orders"
            className={location.pathname === "/admin/orders" ? "active" : ""}
          >
            🧾 Órdenes
          </Link>

          <Link
            to="/admin/products/create"
            className={
              location.pathname === "/admin/products/create" ? "active" : ""
            }
          >
            ➕ Crear producto
          </Link>

          {user?.role === "superadmin" && (
            <Link
              to="/super-admin"
              className={location.pathname === "/super-admin" ? "active" : ""}
            >
              🛡 Super Admin
            </Link>
          )}
        </nav>
      </aside>

{sidebarOpen && (
  <div
    className="admin-overlay"
    onClick={() => setSidebarOpen(false)}
  />
)}
      {/* CONTENIDO */}
      <main className="admin-content">
        {/* HEADER */}
        <header className="admin-header">
          <button
  className="menu-toggle"
  onClick={() =>
    setSidebarOpen(!sidebarOpen)
  }
>
  ☰
</button>
          <div>
            <h1>Panel Administrativo</h1>
          </div>

          <div className="admin-user">
            <span>👋 {user?.name}</span>

            <button onClick={logout}>Cerrar sesión</button>
          </div>
        </header>

        {/* PÁGINAS */}
        <div className="admin-page">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
