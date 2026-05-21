import toast from "react-hot-toast";

export const cartToast = (productName) => {
  toast.custom((t) => (
    <div
      className={`
        custom-toast
        ${t.visible ? "toast-enter" : "toast-leave"}
      `}
    >
      <div className="toast-icon">
        🛒
      </div>

      <div className="toast-content">
        <h4>
          Producto agregado
        </h4>

        <p>{productName}</p>
      </div>
    </div>
  ));
};