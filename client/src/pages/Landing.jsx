import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import WhyChooseUs from "../components/WhyChooseUs";
import FeaturedProducts from "../components/FeaturedProducts";

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

            <button className="btn secondary" onClick={() => navigate("/login")}>
              Iniciar sesión
            </button>
          </div>
        </motion.div>
      </div>

      {/* 🆕 SEGUNDA SECCIÓN */}
      <section className="features">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Destacados
        </motion.h2>

        <div className="features-grid">

          <motion.div
            className="feature-card"
            whileHover={{ scale: 1.05 }}
          >
            <img src="https://placehold.co/300" alt="" />
            <h3>Nuevos ingresos</h3>
          </motion.div>

          <motion.div
            className="feature-card"
            whileHover={{ scale: 1.05 }}
          >
            <img src="https://placehold.co/300" alt="" />
            <h3>Más vendidos</h3>
          </motion.div>

          <motion.div
            className="feature-card"
            whileHover={{ scale: 1.05 }}
          >
            <img src="https://placehold.co/300" alt="" />
            <h3>Ofertas</h3>
          </motion.div>
        </div>
      </section>
 <FeaturedProducts />
      {/* 🆕 SECCIÓN 3 */}
      <WhyChooseUs />

    </div>
  );
}

export default Landing;