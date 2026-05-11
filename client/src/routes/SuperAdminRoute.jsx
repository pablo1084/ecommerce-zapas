import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const SuperAdminRoute = ({ children }) => {

  const {
    user,
    isAuth,
    loadingUser
  } = useContext(AuthContext);

  if (loadingUser) {
    return <p>Cargando...</p>;
  }

  if (!isAuth) {
    return <Navigate to="/auth" replace />;
  }

  if (user?.role !== "superadmin") {
    return <Navigate to="/shop" replace />;
  }

  return children;
};

export default SuperAdminRoute;