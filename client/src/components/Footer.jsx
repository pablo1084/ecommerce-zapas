function Footer() {
  return (
    <footer className="footer">

      <div className="footer-content">

        {/* MARCA */}
        <div>
          <h3>Urban Store</h3>
          <p>Las mejores zapatillas urbanas</p>
        </div>

        {/* LINKS */}
        <div>
          <h4>Secciones</h4>
          <p>Productos</p>
          <p>Órdenes</p>
        </div>

        {/* CONTACTO */}
        <div>
          <h4>Contacto</h4>
          <p>Email: soporte@urbanstore.com</p>
          <p>Catamarca, Argentina</p>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Urban Store - Todos los derechos reservados
      </div>

    </footer>
  );
}

export default Footer;