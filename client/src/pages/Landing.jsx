import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="landing">

      {/* HERO */}
      <section className="hero">
        <h1>Urban Store</h1>
        <p>Zapatillas urbanas, estilo y actitud</p>

        <div className="hero-buttons">
          <Link to="/login" className="btn primary">
            Iniciar sesión
          </Link>

          <Link to="/register" className="btn secondary">
            Crear cuenta
          </Link>

          <Link to="/shop" className="btn guest">
    Ingresar
  </Link>
        </div>
      </section>

    </div>
  );
}

export default Landing;