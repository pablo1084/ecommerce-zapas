import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/profile.css"

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
if (!name.trim()) {
  toast.error("El nombre no puede estar vacío");
  return;
}

if (name.trim().length < 2) {
  toast.error("El nombre debe tener al menos 2 caracteres");
  return;
}

// opcional
const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

if (!nameRegex.test(name)) {
  toast.error("El nombre solo puede contener letras");
  return;
}
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: name.trim() }),
      });

      const data = await res.json();

if (!res.ok) {
  throw new Error(data.error || "Error al actualizar");
}

      // actualizar contexto global
      setUser(data);

      toast.success("Perfil actualizado correctamente");
      setTimeout(() => {
  navigate("/shop");
}, 1200);

    } catch (error) {
  console.log(error);
  toast.error(error.message);
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <h2>Mi perfil</h2>

      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input
  type="text"
  value={name}
  onChange={(e) => {
    const value = e.target.value;
    setName(value);

    if (!value.trim()) {
      setError("El nombre es obligatorio");
    } else if (value.trim().length < 2) {
      setError("Mínimo 2 caracteres");
    } else {
      setError("");
    }
  }}
/>
{error && <p className="error-text">{error}</p>}
        <button type="submit" disabled={loading || error}>
  {loading ? "Guardando..." : "Guardar cambios"}
</button>
      </form>
    </div>
  );
};

export default Profile;