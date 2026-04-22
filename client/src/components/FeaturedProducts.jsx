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
        setProducts(res.data.slice(0, 4)); // solo 4 destacados
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

            <button onClick={() => handleAdd(p)}>
              Agregar al carrito
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;