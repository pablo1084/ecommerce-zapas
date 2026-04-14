import { useEffect, useState } from "react";
import api from "./api/axios";
import { Routes, Route } from "react-router-dom";

import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/NavBar";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));

const handleLogin = () => {
  setIsAuth(true);
};

//Logout
const logout = () => {
  localStorage.removeItem("token");
  setIsAuth(false);
};

// Traer productos
  const getProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log("Error al traer productos", error);
    }
  };

  // Traer carrito
  const getCart = async () => {
    try {
      const res = await api.get("/cart");
      setCart(res.data);
    } catch (error) {
      console.log("Error al traer carrito", error);
    }
  };

  //Ver ordenes
  const getOrders = async () => {
  try {
    const res = await api.get("/orders");
    setOrders(res.data);
  } catch (error) {
    console.log("Error al traer órdenes", error);
  }
};

  // Cargar datos al iniciar
  useEffect(() => {
  const fetchData = async () => {
    await getProducts();
    await getCart();
    await getOrders();
  };

  fetchData();
}, []);

  // Agregar al carrito
  const addToCart = async (productId) => {
    try {
      await api.post("/cart", {
        productId,
        quantity: 1
      });

      await getCart();

      alert("Producto agregado al carrito");
    } catch (error) {
      console.log("Error al agregar", error);
    }
  };

// Finalizar compra
const checkout = async () => {
  if (!cart?.items?.length) {
    alert("El carrito está vacío");
    return;
  }

  try {
    await api.post("/orders");

    alert("Compra realizada con éxito");

    await getCart();
    await getOrders();

  } catch (error) {
    alert(error.response?.data?.msg || "Error en checkout");
  }
};


if (!isAuth) {
  
  return (
    
    <div>
      <Login onLogin={handleLogin} />
      <Register />
    </div>
  );
}

  return (
    
  <div>
    <Navbar />
    <Routes>
      <Route
        path="/"
        element={
          <>
            <ProductList products={products} addToCart={addToCart} />
            <Cart cart={cart} checkout={checkout} />
          </>
        }
      />

      <Route
        path="/orders"
        element={<Orders orders={orders} />}
      />
    </Routes>
  </div>
);
}

export default App;