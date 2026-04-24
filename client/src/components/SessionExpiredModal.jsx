import { motion } from "framer-motion";

function SessionExpiredModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <motion.div
        className="modal"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
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