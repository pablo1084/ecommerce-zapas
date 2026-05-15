import { useState, useEffect, useContext } from "react";
import { OrderContext } from "./OrderContext";
import { AuthContext } from "./AuthContext";
import api from "../api/axios";

export const OrderProvider = ({ children }) => {

  const { isAuth } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);

  // Obtener órdenes
  const getOrders = async () => {

    try {

      const res = await api.get("/orders");

      setOrders(res.data);

    } catch (error) {

      console.log("Error al obtener órdenes", error);
    }
  };

  // Cargar automáticamente
  useEffect(() => {

    if (isAuth) {

      getOrders();

    } else {

      setOrders([]);
    }

  }, [isAuth]);

  return (
    <OrderContext.Provider
      value={{
        orders,
        getOrders
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};