import { useState, useEffect, useRef } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext } from "react";
import { CartContext } from "./CartContext";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [showSessionModal, setShowSessionModal] = useState(false);
  const [isAuth, setIsAuth] = useState(
    !!localStorage.getItem("token")
  );

  const timeoutRef = useRef(null); // ✅ CORRECTO (dentro del componente)

  // ⏱️ tiempo de inactividad (15 min)
  const INACTIVITY_TIME = 10000;

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    
    setShowSessionModal(true);
    navigate("/", { replace: true });
  };

  const login = (token) => {
  localStorage.setItem("token", token);
  setIsAuth(true);
};

  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      logout();
      toast.error("Sesión expirada por inactividad");
    }, INACTIVITY_TIME);
  };

  const handleCloseModal = () => {
  setShowSessionModal(false);
  navigate("/", { replace: true });
};

  useEffect(() => {
    if (!isAuth) return;

    const events = ["mousemove", "keydown", "click", "scroll"];

    const handleActivity = () => {
      resetTimer();
    };

    events.forEach((event) =>
      window.addEventListener(event, handleActivity)
    );

    resetTimer();

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isAuth]);

  return (
   <AuthContext.Provider value={{ 
  isAuth, 
  login, 
  logout,
  showSessionModal,
  handleCloseModal
}}>
      {children}
    </AuthContext.Provider>
  );
};