import { useEffect, useState, useContext } from "react";
import api from "./api/axios";
import { Routes, Route } from "react-router-dom";
import toast from "react-hot-toast";
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
const [loading, setLoading] = useState(true);
const {
  cart,
  getCart,
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
      toast.error(error.response?.data?.msg || "Error en checkout");
    }
  };
  
  //Ver ordenes
  const getOrders = async () => {
  try {
    const res = await api.get("/orders");
    setOrders(res.data);
  } catch (error) {
    toast.error(error.response?.data?.msg || "Error en checkout");
  }
};

  // Cargar datos al iniciar
  useEffect(() => {
  if (!isAuth) return;

  const fetchData = async () => {
  setLoading(true);

  await getProducts();
  await getCart();
  await getOrders();

  setTimeout(() => {
    setLoading(false);
  }, 500);
};

  fetchData();
}, [isAuth]);

// Finalizar compra
const checkout = async () => {
  if (!cart?.items?.length) {
    toast.success("El carrito se encuentra vacío");
    return;
  }

  try {
    await api.post("/orders");

    toast.success("Compra realizada con éxito 🎉");

    await getCart();
    await getOrders();

  } catch (error) {
  console.log("ERROR BACKEND:", error.response?.data);
  toast.error(error.response?.data?.msg || "Error en checkout");
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
      <ProductList 
  products={products} 
  addToCart={addToCart} 
  loading={loading}
/>
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
          element={<Orders orders={orders} loading={loading}/>}
        />
      </Routes>
    </main>
  </div>
);
}

export default App;