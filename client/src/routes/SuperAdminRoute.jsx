import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const SuperAdminRoute = ({ children }) => {
  const { user, isAuth } = useContext(AuthContext);

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "superadmin") {
    return <Navigate to="/shop" replace />;
  }

  return children;
};

export default SuperAdminRoute;