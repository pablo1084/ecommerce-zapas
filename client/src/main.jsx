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
            containerStyle={{ top: 80 }}
            toastOptions={{
              style: {
                borderRadius: "10px",
                padding: "12px 16px",
              },
            }}
          />

        </CartProvider>

      </OrderProvider>

    </AuthProvider>

  </BrowserRouter>
);