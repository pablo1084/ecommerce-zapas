import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/productdetail.css"

const ProductDetail = ({ addToCart }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (!product) return <p>Producto no encontrado</p>;

  

  return (
    <div className="product-detail">
      

      {/* IMAGEN */}
      <div className="image zoom-container">
  <img
    src={product.images?.[0] || "https://placehold.co/400"}
    alt={product.name}
    className="zoom-image"
    onMouseMove={(e) => {
      const { left, top, width, height } = e.target.getBoundingClientRect();

      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;

      e.target.style.transformOrigin = `${x}% ${y}%`;
    }}
  />
</div>

      {/* INFO */}
      <div className="info">
        <button className="back-button" onClick={() => navigate(-1) || navigate("/shop")}>
        ⬅ Volver
      </button>
        <h1>{product.name}</h1>

        <p className="price">${product.price}</p>

        <p className="description">{product.description}</p>

        <p className="stock">
          <strong>Stock:</strong> {product.stockStatus}
        </p>

        {/* CANTIDAD */}
        <div className="quantity">
          <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
            -
          </button>

          <span>{quantity}</span>

          <button
            onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
          >
            +
          </button>
        </div>

        {/* BOTÓN */}
        <button
          className="add-to-cart"
          disabled={product.stock === 0}
          onClick={() => addToCart(product._id, quantity)}
        >
          {product.stock === 0 ? "Sin stock" : "Agregar al carrito"}
        </button>

        {/* ENVÍO */}
        <div className="shipping">
          <p>🚚 Envío a todo el país</p>
          <p>💳 Hasta 12 cuotas sin interés</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
