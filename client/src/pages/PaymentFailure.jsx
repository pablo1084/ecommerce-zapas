import { Link } from "react-router-dom";
import "../styles/paymentpages.css"

function PaymentFailure() {

  return (
    <div className="payment-page failure">

      <div className="payment-card">

        <h1>❌ Pago rechazado</h1>

        <p>
          No se pudo procesar el pago.
        </p>

        <div className="payment-actions">

          <Link to="/shop">
            <button>
              Volver a la tienda
            </button>
          </Link>

        </div>

      </div>

    </div>
  );
}

export default PaymentFailure;