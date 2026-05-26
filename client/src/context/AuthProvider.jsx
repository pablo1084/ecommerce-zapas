import { useState, useEffect, useRef } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CartContext } from "./CartContext";

export const AuthProvider = ({ children }) => {

  const [loadingUser, setLoadingUser] = useState(true);
  const navigate = useNavigate();

  const [showSessionModal, setShowSessionModal] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(
    !!localStorage.getItem("token")
  );

  const timeoutRef = useRef(null);

  // ⏱️ tiempo de inactividad (15 min)
  const INACTIVITY_TIME = 15 * 60 * 1000;

  const fetchUser = async (token) => {
  try {
    const res = await fetch("http://localhost:3000/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Error al obtener usuario");

    const data = await res.json();
    setUser(data);

  } catch (error) {
    console.log(error);
    logout();
  } finally {
    setLoadingUser(false);
  }
};

useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    fetchUser(token);
  } else {
    setLoadingUser(false);
  }
}, []);

  const logout = (showModal = false) => {
  localStorage.removeItem("token");
  setIsAuth(false);
  setUser(null);

  if (showModal) {
    setShowSessionModal(true);
  }
toast.success("Sesión cerrada correctamente");
  navigate("/", { replace: true });
};

 const login = (token) => {
  localStorage.setItem("token", token);
  setIsAuth(true);
  fetchUser(token);
};

  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      logout(true);
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
  user,
  loadingUser,
  setUser,
  login, 
  logout,
  showSessionModal,
  handleCloseModal
}}>
      {children}
    </AuthContext.Provider>
  );
};