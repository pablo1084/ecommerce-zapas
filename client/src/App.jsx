import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
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
import Landing from "./pages/Landing";
import SessionExpiredModal from "./components/SessionExpiredModal";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
const { isAuth, login } = useContext(AuthContext);
const [loading, setLoading] = useState(true);
const { showSessionModal, handleCloseModal } = useContext(AuthContext);
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
  const fetchData = async () => {
    setLoading(true);

    await getProducts();

    if (isAuth) {
      await getCart();
      await getOrders();
    }

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  fetchData();
}, [isAuth]);

// Finalizar compra
const checkout = async () => {
  if (!isAuth) {
    navigate("/login");
    return;
  }
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

  return (
  <div>
    {location.pathname !== "/" && (
  <Navbar 
  cart={cart}
  checkout={checkout}
  removeFromCart={removeFromCart}
  updateQuantity={updateQuantity}
  clearCart={clearCart}
/>
)}

{showSessionModal && (
  <SessionExpiredModal onClose={handleCloseModal} />
)}

    <main className="container">
      <Routes>

        {/* 🟣 LANDING */}
        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login onLogin={login} />} />

  {/* Register */}
  <Route path="/register" element={<Register />} />

        {/* 🟢 TIENDA */}
        <Route
          path="/shop"
          element={
            
            <div className="home-layout">
              <ProductList 
                products={products} 
                addToCart={addToCart} 
                loading={loading}
              />
            </div>
          }
        />

        {/* 🔵 ÓRDENES */}
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