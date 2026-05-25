import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import "../styles/auth.css"
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import bg1 from "../assets/auth-bg/bg1.jpg";
import bg2 from "../assets/auth-bg/bg2.jpg";
import bg3 from "../assets/auth-bg/bg3.jpg";
import bg4 from "../assets/auth-bg/bg4.jpg";
import bg5 from "../assets/auth-bg/bg5.jpg";
import bg6 from "../assets/auth-bg/bg6.jpg";
import bg7 from "../assets/auth-bg/bg7.jpg";
import bg8 from "../assets/auth-bg/bg8.jpg";
import bg9 from "../assets/auth-bg/bg9.jpg";

function Auth() {
  const backgrounds = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9];
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/shop";
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [bg, setBg] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showVerifyMessage, setShowVerifyMessage] = useState(false);

  useEffect(() => {
    const random = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    setBg(random);
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setForm({
      name: "",
      email: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    setLoginError("");

    try {
      if (isLogin) {
        const res = await api.post("/auth/auth", {
          email: form.email,
          password: form.password,
        });

        const token = res.data.token;

        if (!token) {
          toast.error("No se recibió token");
          return;
        }

        login(token);

        toast.success("Bienvenido 🔥");
        navigate(from);
      } else {
        await api.post("/auth/register", form);

        toast.success("Revisá tu correo para verificar tu cuenta 📩");

        setShowVerifyMessage(true);

        setForm({
          name: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {

  const message =
    error.response?.data?.error ||
    error.response?.data?.msg;

  if (
    message ===
    "Debes verificar tu email"
  ) {

    setLoginError(
      "Debes verificar tu email antes de iniciar sesión."
    );

  }
  else if (
    message ===
    "Cuenta bloqueada"
  ) {

    setLoginError(
      "Tu cuenta fue bloqueada por un administrador."
    );

  }
  else {

    setLoginError(
      "Email o contraseña incorrectos"
    );
  }

  toast.error(
    message || "Error en autenticación"
  );

} finally {

  setLoading(false);
}
  };

  return (
    <div
  className="auth-container"
  style={{
    backgroundImage: `url(${bg})`,
  }}
>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-titulo">
          {isLogin ? "Iniciar sesión" : "Crear cuenta"}
        </h2>

        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />

        {loginError && <p className="login-error">{loginError}</p>}

        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? "Procesando..." : isLogin ? "Ingresar" : "Registrarse"}
        </button>

        {showVerifyMessage && (
          <div className="verify-message">
            <h3>Revisá tu email 📩</h3>

            <p>Te enviamos un enlace de verificación.</p>

            <p>Debés verificar tu cuenta antes de iniciar sesión.</p>

            <button
              type="button"
              onClick={() => {
                setShowVerifyMessage(false);
                setIsLogin(true);
              }}
            >
              Ir al login
            </button>
          </div>
        )}

        <p className="auth-switch" onClick={toggleMode}>
          {isLogin
            ? "¿No tenés cuenta? Registrate"
            : "¿Ya tenés cuenta? Iniciar sesión"}
        </p>
      </form>
    </div>
  );
}

export default Auth;