import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { CartProvider } from "./context/CartProvider";
import { OrderProvider } from "./context/OrderProvider";
import { Toaster } from "react-hot-toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>

    <AuthProvider>

      <OrderProvider>

        <CartProvider>

          <App />

          <Toaster
  position="top-right"
  gutter={12}
  reverseOrder={false}
  containerStyle={{
    top: 90,
    right: 20,
  }}
  toastOptions={{
    duration: 3500,

    style: {
      background: "#111",
      color: "#fff",
      borderRadius: "14px",
      padding: "14px 18px",
      fontSize: "14px",
      fontWeight: "500",
      boxShadow:
        "0 10px 30px rgba(0,0,0,0.25)",
    },

    success: {
      iconTheme: {
        primary: "#22c55e",
        secondary: "#fff",
      },

      style: {
        border:
          "1px solid rgba(34,197,94,0.25)",
      },
    },

    error: {
      iconTheme: {
        primary: "#ef4444",
        secondary: "#fff",
      },

      style: {
        border:
          "1px solid rgba(239,68,68,0.25)",
      },
    },
  }}
/>

        </CartProvider>

      </OrderProvider>

    </AuthProvider>

  </BrowserRouter>
);