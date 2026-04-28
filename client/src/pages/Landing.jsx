import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import WhyChooseUs from "../components/WhyChooseUs";
import FeaturedProducts from "../components/FeaturedProducts";
import ProductCarousel from "../components/ProductCarousel";

function Landing() {
  const navigate = useNavigate();

  return (
    <div>

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

            <button className="btn secondary" onClick={() => navigate("/auth")}>
              Iniciar sesión
            </button>
          </div>
        </motion.div>
      </div>

      {/* 🔥 NUEVO CARRUSEL */}
  <ProductCarousel />

 <FeaturedProducts />
      {/* 🆕 SECCIÓN 3 */}
      <WhyChooseUs />

    </div>
  );
}

export default Landing;