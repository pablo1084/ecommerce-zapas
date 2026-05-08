import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, isAuth, loadingUser } =
    useContext(AuthContext);

  // Esperar a que cargue el usuario
  if (loadingUser) {
    return <p>Cargando...</p>;
  }

  // No autenticado
  if (!isAuth) {
    return <Navigate to="/auth" replace />;
  }

  // No tiene permisos
  if (
    user?.role !== "admin" &&
    user?.role !== "superadmin"
  ) {
    return <Navigate to="/shop" replace />;
  }

  // Acceso permitido
  return children;
};

export default AdminRoute;