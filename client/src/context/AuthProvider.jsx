import { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(
    !!localStorage.getItem("token")
  );

  const login = () => setIsAuth(true);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};