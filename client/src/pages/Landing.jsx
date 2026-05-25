import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import WhyChooseUs from "../components/WhyChooseUs";
import FeaturedProducts from "../components/FeaturedProducts";
import ProductCarousel from "../components/ProductCarousel";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import "../styles/landing.css";

function Landing() {
  const navigate = useNavigate();
  const { isAuth, logout } = useContext(AuthContext);
const [showSessionModal, setShowSessionModal] = useState(false);

const handleAuthClick = () => {
  if (isAuth) {
    setShowSessionModal(true);
  } else {
    navigate("/auth");
  }
};

  return (
    <div>
{showSessionModal && (
  <div className="modal-overlay" onClick={() => setShowSessionModal(false)}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      
      <h3>Ya tenés una sesión activa</h3>
      <p>¿Qué querés hacer?</p>

      <button
        onClick={() => {
          logout();
          setShowSessionModal(false);
        }}
      >
        Cerrar sesión
      </button>

      <button
        onClick={() => {
          navigate("/shop");
        }}
      >
        Ir a la tienda
      </button>

    </div>
  </div>
)}
      {/* HERO */}
      <div className="landing">
        <motion.div
          className="hero"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Urban Store</h1>
          <p>Las mejores zapatillas urbanas</p>

          <div className="hero-buttons">
            <button className="btn primary" onClick={() => navigate("/shop")}>
              Ver productos
            </button>

            <button className="btn secondary" onClick={handleAuthClick}>
  {isAuth ? "Sesión Iniciada" : "Iniciar sesión"}
</button>
          </div>
        </motion.div>
      </div>

      {/* CARRUSEL */}
  <ProductCarousel />

 <FeaturedProducts />
      {/* SECCIÓN 3 */}
      <WhyChooseUs />

    </div>
  );
}

export default Landing;