import { Link } from "react-router-dom";
import "../styles/paymentpages.css"

function PaymentPending() {

  return (
    <div className="payment-page pending">

      <div className="payment-card">

        <h1>⏳ Pago pendiente</h1>

        <p>
          MercadoPago todavía está procesando el pago.
        </p>

        <div className="payment-actions">

          <Link to="/orders">
            <button>
              Ver mis órdenes
            </button>
          </Link>

        </div>

      </div>

    </div>
  );
}

export default PaymentPending;