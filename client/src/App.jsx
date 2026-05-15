import {
  useNavigate,
  useLocation,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "./api/axios";
import toast from "react-hot-toast";
import "./App.css";
import { AuthContext } from "./context/AuthContext";
import { CartContext } from "./context/CartContext";
import { OrderContext } from "./context/OrderContext";
import Navbar from "./components/NavBar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import SessionExpiredModal from "./components/SessionExpiredModal";
import Footer from "./components/Footer";
import PrivateRoute from "./routes/privateRoute";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import PaymentSuccess from "./pages/PaymentSucess";
import PaymentFailure from "./pages/PaymentFailure";
import PaymentPending from "./pages/PaymentPending";
import AdminRoute from "./routes/AdminRoute";
import SuperAdminRoute from "./routes/SuperAdminRoute";
import AdminProducts from "./pages/admin/AdminProducts";
import SuperAdminPanel from "./pages/admin/SuperAdminPanel";
import EditProduct from "./pages/admin/EditProduct";
import CreateProduct from "./pages/admin/CreateProduct";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { isAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const { showSessionModal, handleCloseModal } = useContext(AuthContext);
  const { orders, getOrders } =
  useContext(OrderContext);
  const {
    cart,
    getCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    checkout,
    checkoutLoading,
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

  return (
    <div>
      {location.pathname !== "/" && (
        <Navbar
          cart={cart}
          checkout={checkout}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          clearCart={clearCart}
          checkoutLoading={checkoutLoading}
        />
      )}

      {showSessionModal && <SessionExpiredModal onClose={handleCloseModal} />}
{checkoutLoading && (
  <div className="checkout-overlay">

    <div className="checkout-modal">

      <div className="spinner"></div>

      <h2>Esperando confirmación del pago...</h2>

      <p>
        No cierres esta ventana mientras
        MercadoPago procesa tu compra.
      </p>

    </div>

  </div>
)}
      <main className="container">
        <Routes>
          {/* 🟣 LANDING */}
          <Route path="/" element={<Landing />} />

          {/* 🔐 AUTH */}
          <Route path="/auth" element={<Auth />} />

          {/* 🟢 TIENDA */}
          <Route path="/shop" element={<Shop addToCart={addToCart} />} />

          {/* 👤 PERFIL */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          {/* 📦 DETALLE PRODUCTO */}
          <Route
            path="/product/:id"
            element={<ProductDetail addToCart={addToCart} />}
          />

          {/* 🔵 ÓRDENES */}
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <Orders orders={orders} />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <AdminProducts />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/products/create"
            element={
              <AdminRoute>
                <CreateProduct />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/products/edit/:id"
            element={
              <AdminRoute>
                <EditProduct />
              </AdminRoute>
            }
          />

          <Route
            path="/super-admin"
            element={
              <SuperAdminRoute>
                <SuperAdminPanel />
              </SuperAdminRoute>
            }
          />

<Route
  path="/payment-success"
  element={<PaymentSuccess />}
/>

<Route
  path="/payment-failure"
  element={<PaymentFailure />}
/>

<Route
  path="/payment-pending"
  element={<PaymentPending />}
/>

        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
