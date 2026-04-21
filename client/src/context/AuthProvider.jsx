import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(
    !!localStorage.getItem("token")
  );

  const login = () => setIsAuth(true);

 const logout = () => {
  localStorage.removeItem("token");
  setIsAuth(false);

  // 👇 fuerza navegación real
  navigate("/", { replace: true });
};

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};