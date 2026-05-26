import { Link } from "react-router-dom";
import "../styles/paymentpages.css"

function PaymentSuccess() {

  return (
    <div className="payment-page success">

      <div className="payment-card">

        <h1>✅ Pago aprobado</h1>

        <p>
          Tu compra fue procesada correctamente.
        </p>

        <div className="payment-actions">

          <Link to="/orders">
            <button>
              Ver mis órdenes
            </button>
          </Link>

          <Link to="/shop">
            <button>
              Seguir comprando
            </button>
          </Link>

        </div>

      </div>

    </div>
  );
}

export default PaymentSuccess;