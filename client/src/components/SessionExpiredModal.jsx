import { motion } from "framer-motion";
import { useEffect } from "react";

function SessionExpiredModal({ onClose }) {

  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      
      <motion.div
        className="modal"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200 }}

        // Evita cerrar al hacer click dentro
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Sesión finalizada</h2>
        <p>Tu sesión se cerró por seguridad</p>

        <button onClick={onClose}>
          OK
        </button>
      </motion.div>

    </div>
  );
}

export default SessionExpiredModal;