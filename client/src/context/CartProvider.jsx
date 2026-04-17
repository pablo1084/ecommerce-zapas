import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CartContext } from "./CartContext";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import api from "../api/axios";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
const { isAuth } = useContext(AuthContext);
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
  if (!isAuth) return;

  const fetchCart = async () => {
    await getCart();
  };

  fetchCart();
}, [isAuth]);

  // Agregar
  const addToCart = async (productId) => {
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

  return (
    <CartContext.Provider
      value={{
        cart,
        getCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};