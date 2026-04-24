import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import axios from "../api/axios";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const { isAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products");
        setProducts(res.data.slice(0, 4));
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  const handleAdd = (product) => {
    if (!isAuth) {
      toast.error("Tenés que iniciar sesión");
      navigate("/login");
      return;
    }

    addToCart(product._id, 1);
    toast.success("Producto agregado 🛒");
  };


const animateToCart = (imgElement) => {
  const cart = document.getElementById("cart-icon");

  if (!cart || !imgElement) return;

  const imgRect = imgElement.getBoundingClientRect();
  const cartRect = cart.getBoundingClientRect();

  const clone = imgElement.cloneNode(true);

  clone.style.position = "fixed";
  clone.style.top = imgRect.top + "px";
  clone.style.left = imgRect.left + "px";
  clone.style.width = imgRect.width + "px";
  clone.style.height = imgRect.height + "px";
  clone.style.transition = "all 0.8s ease-in-out";
  clone.style.zIndex = 9999;
  clone.style.borderRadius = "10px";

  document.body.appendChild(clone);

  setTimeout(() => {
    clone.style.top = cartRect.top + "px";
    clone.style.left = cartRect.left + "px";
    clone.style.width = "30px";
    clone.style.height = "30px";
    clone.style.opacity = 0.5;
  }, 10);

  setTimeout(() => {
    document.body.removeChild(clone);
  }, 800);
};

  return (
    <section className="featured-products">
      <h2>Productos destacados</h2>

      <div className="products-grid">
        {products.map((p) => (
          <motion.div
            key={p._id}
            className="product-card-featuredProduct"
            whileHover={{ scale: 1.05 }}
          >
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>${p.price}</p>

            <button
  onClick={(e) => {
    const img = e.currentTarget.parentElement.querySelector("img");

    animateToCart(img);
    handleAdd(p);
  }}
>
  Agregar al carrito
</button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;