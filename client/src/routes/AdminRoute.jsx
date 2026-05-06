import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user, loadingUser } = useContext(AuthContext);

  // ⏳ esperar a que cargue el usuario
  if (loadingUser) return <p>Cargando...</p>;

  if (!user || user.role !== "admin") {
    return <Navigate to="/shop" replace />;
  }

  return children;
};

export default AdminRoute;