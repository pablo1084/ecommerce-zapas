import { motion } from "framer-motion";
import { FaTruck, FaLock, FaCreditCard, FaHeadset } from "react-icons/fa";

const features = [
  {
    icon: <FaTruck />,
    title: "Envíos rápidos",
    desc: "Recibí tu pedido en tiempo récord a todo el país.",
  },
  {
    icon: <FaLock />,
    title: "Compra segura",
    desc: "Protegemos tus datos con tecnología de encriptación.",
  },
  {
    icon: <FaCreditCard />,
    title: "Pagos flexibles",
    desc: "Aceptamos múltiples medios de pago.",
  },
  {
    icon: <FaHeadset />,
    title: "Soporte 24/7",
    desc: "Estamos para ayudarte en todo momento.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const WhyChooseUs = () => {
  return (
    <section className="why-section">
      <h2>¿Por qué elegirnos?</h2>

      <motion.div
        className="why-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {features.map((item, index) => (
          <motion.div
            className="why-card"
            key={index}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className="icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default WhyChooseUs;