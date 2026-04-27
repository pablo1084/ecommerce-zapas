import { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // LOGIN
        const res = await api.post("/auth/login", {
          email: form.email,
          password: form.password,
        });

        localStorage.setItem("token", res.data.token);
        toast.success("Bienvenido 🔥");
        navigate("/shop");
      } else {
        // REGISTER
        await api.post("/auth/register", form);

        toast.success("Cuenta creada correctamente");
        setIsLogin(true);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.msg || "Error en autenticación"
      );
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        
        <h2 className="auth-titulo">{isLogin ? "Iniciar sesión" : "Crear cuenta"}</h2>

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

        <button type="submit" className="auth-btn">
          {isLogin ? "Ingresar" : "Registrarse"}
        </button>

        <p
          className="auth-switch"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "¿No tenés cuenta? Registrate"
            : "¿Ya tenés cuenta? Iniciar sesión"}
        </p>

      </form>
    </div>
  );
}

export default Auth;