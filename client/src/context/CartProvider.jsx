import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import api from "../api/axios";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);

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

  fetchCart();
}, []);

  // Agregar
  const addToCart = async (productId) => {
    try {
      await api.post("/cart", { productId, quantity: 1 });
      await getCart();
    } catch (error) {
      console.log(error);
    }
  };

  // Eliminar
  const removeFromCart = async (productId) => {
    try {
      await api.delete(`/cart/${productId}`);
      await getCart();
    } catch (error) {
      console.log(error);
    }
  };

  // Actualizar cantidad
  const updateQuantity = async (productId, quantity) => {
    try {
      await api.put(`/cart/${productId}`, { quantity });
      await getCart();
    } catch (error) {
      console.log(error);
    }
  };

  // Vaciar carrito
  const clearCart = async () => {
    try {
      await api.delete("/cart");
      await getCart();
    } catch (error) {
      console.log(error);
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