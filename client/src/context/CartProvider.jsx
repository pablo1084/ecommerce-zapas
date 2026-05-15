import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { CartContext } from "./CartContext";
import { AuthContext } from "./AuthContext";
import { OrderContext } from "./OrderContext";
import api from "../api/axios";

export const CartProvider = ({ children }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState({ items: [] });
  const [checkoutLoading, setCheckoutLoading] = useState(false);
const { isAuth } = useContext(AuthContext);
const { getOrders } =
  useContext(OrderContext);

const requireAuth = () => {
  if (!isAuth) {
    toast("Tenés que iniciar sesión");
    navigate("/auth", { state: { from: "/shop" } });
    return false;
  }
  return true;
};

  // Obtener carrito
  const getCart = async () => {
    try {
      const res = await api.get("/cart");
      setCart(res.data);
    } catch (error) {
      console.log("Error al traer carrito", error);
    }
  };

  useEffect(() => {
  const fetchCart = async () => {
    await getCart();
  };

  if (isAuth) {
    fetchCart();
  } else {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCart({ items: [] });
  }
}, [isAuth]);

  // Agregar
  const addToCart = async (productId) => {
    if (!requireAuth()) return;
  try {
    await api.post("/cart", { productId, quantity: 1 });
    await getCart();
    toast.success("Producto agregado al carrito");
  } catch (error) {
    console.log(error)
    toast.error(
    error.response?.data?.msg || "Error al agregar producto"
  );
  }
};

  // Eliminar
  const removeFromCart = async (productId) => {
    if (!requireAuth()) return;
  try {
    await api.delete(`/cart/${productId}`);
    await getCart();
    toast.success("Producto eliminado");
  } catch (error) {
    console.log(error)
    toast.error(
    error.response?.data?.msg || "Error al eliminar producto"
  );
  }
};

  // Actualizar cantidad
  const updateQuantity = async (productId, quantity) => {
    if (!requireAuth()) return;
  try {
    await api.put(`/cart/${productId}`, { quantity });
    await getCart();
    toast.success("Cantidad actualizada");
  } catch (error) {
    console.log(error)
    toast.error(
    error.response?.data?.msg || "Error al actualizar cantidad"
  );
  }
};

  // Vaciar carrito
  const clearCart = async () => {
    if (!requireAuth()) return;
  try {
    await api.delete("/cart");
    await getCart();
    toast.success("Carrito vaciado");
  } catch (error) {
    console.log(error)
    toast.error(
    error.response?.data?.msg || "Error al vaciar carrito"
  );
  }
};

const checkout = async () => {

  if (!requireAuth()) return;

  if (!cart?.items?.length) {

    toast.success("El carrito está vacío");

    return;
  }

  try {

    setCheckoutLoading(true);

    // 1️⃣ Crear orden
    const orderRes = await api.post("/orders");

    const order = orderRes.data.order;

    // 2️⃣ Crear preferencia MercadoPago
    const prefRes = await api.post(
      "/payments/create-preference",
      {
        items: order.items,
        orderId: order._id
      }
    );

    // 3️⃣ Abrir checkout MP
    const paymentWindow = window.open(
  prefRes.data.init_point,
  "_blank"
);

// Polling
const interval = setInterval(async () => {

  try {

    const cartRes = await api.get("/cart");

    setCart(cartRes.data);

    await getOrders();

    // carrito vacío = pago confirmado
    if (cartRes.data.items.length === 0) {

      clearInterval(interval);

      toast.success("Pago confirmado 🎉");

      setCheckoutLoading(false);

      navigate("/payment-success");
    }

  } catch (error) {

    console.log(error);
  }

}, 5000);

  } catch (error) {

    console.log(error);

    toast.error(
      error.response?.data?.msg ||
      "Error en checkout"
    );

  }
};

const getTotalItems = () => {
  if (!cart || !Array.isArray(cart.items)) return 0;

  return cart.items.reduce((acc, item) => {
    return acc + (item.quantity || 1);
  }, 0);
};

  return (
    <CartContext.Provider
      value={{
        cart,
        getCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        checkout,
        checkoutLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};