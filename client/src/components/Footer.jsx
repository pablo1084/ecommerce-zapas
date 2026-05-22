import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        
        <div>
          <h3>Urban Store</h3>
          <p>Las mejores zapatillas al mejor precio.</p>
        </div>

        <div>
          <h4>Contacto</h4>
          <p>Email: info@urban.com</p>
          <p>Tel: +54 9 383 XXX</p>
        </div>

        <div>
          <h4>Seguinos</h4>
          <div className="socials">
            <FaInstagram />
            <FaFacebook />
            <FaWhatsapp />
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Urban Store - Todos los derechos reservados
      </div>
    </footer>
  );
}

export default Footer;