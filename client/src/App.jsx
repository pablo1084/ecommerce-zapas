import { useEffect, useState, useContext } from "react";
import api from "./api/axios";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./context/AuthContext";
import { CartContext } from "./context/CartContext";
import Navbar from "./components/NavBar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
const { isAuth, login, logout } = useContext(AuthContext);
const {
  cart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart
} = useContext(CartContext);

// Traer productos
  const getProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log("Error al traer productos", error);
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
    await getOrders();
  };

  fetchData();
}, []);

// Finalizar compra
const checkout = async () => {
  if (!cart?.items?.length) {
    alert("El carrito está vacío");
    return;
  }

  try {
    await api.post("/orders");

    alert("Compra realizada con éxito");

    await getOrders();

  } catch (error) {
    alert(error.response?.data?.msg || "Error en checkout");
  }
};


if (!isAuth) {
  
  return (
    
    <div>
      <Login onLogin={login} />
      <Register />
    </div>
  );
}

  return (
  <div>
    <Navbar logout={logout} />

    <main className="container">
      <Routes>
        <Route
  path="/"
  element={
    <div className="home-layout">
      <ProductList products={products} addToCart={addToCart} />
      <Cart 
  cart={cart} 
  checkout={checkout} 
  removeFromCart={removeFromCart} 
  updateQuantity={updateQuantity}
  clearCart={clearCart}
/>

    </div>
  }
/>
        <Route
          path="/orders"
          element={<Orders orders={orders} />}
        />
      </Routes>
    </main>
  </div>
);
}

export default App;