import { Oval } from "react-loader-spinner";
import SkeletonCard from "./SkeletonCard";
import { useNavigate } from "react-router-dom";
import "../styles/productlist.css";


function ProductList({ products, addToCart, loading }) {
  
  const navigate = useNavigate();
  
  if (loading) {
  return (
    <div className="product-grid">
      {[...Array(8)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

const animateToCart = (imgElement) => {
  const cart = document.getElementById("cart-icon");

  if (!cart || !imgElement) return;

  const imgRect = imgElement.getBoundingClientRect();
  const cartRect = cart.getBoundingClientRect();

  const clone = imgElement.cloneNode(true);

  clone.style.position = "fixed";
  clone.style.top = `${imgRect.top}px`;
  clone.style.left = `${imgRect.left}px`;
  clone.style.width = `${imgRect.width}px`;
  clone.style.height = `${imgRect.height}px`;
  clone.style.transition = "all 0.7s ease-in-out";
  clone.style.zIndex = "9999";
  clone.style.borderRadius = "12px";
  clone.style.pointerEvents = "none";

  document.body.appendChild(clone);

  setTimeout(() => {
    clone.style.top = `${cartRect.top}px`;
    clone.style.left = `${cartRect.left}px`;
    clone.style.width = "30px";
    clone.style.height = "30px";
    clone.style.opacity = "0.4";
    clone.style.transform = "scale(0.7)";
  }, 20);

  setTimeout(() => {
    clone.remove();
    cart.classList.add("cart-bump");

    setTimeout(() => {
      cart.classList.remove("cart-bump");
    }, 200);
  }, 700);
};

  return (
    <section>

      <div className="product-grid">
        {products.map((p) => (
          <div
  key={p._id}
  className="product-card"
  onClick={() => navigate(`/product/${p._id}`)}
>
            
            <img 
  src={p.images?.[0] || "https://placehold.co/200"} 
  alt={p.name} 
/>

            <h3>{p.name}</h3>
            <p className="price">${p.price}</p>

            <button
  onClick={(e) => {
    const card = e.currentTarget.closest(".product-card");
    const img = card.querySelector("img");
    e.stopPropagation();
    animateToCart(img);
    addToCart(p._id);
  }}
>
  Agregar al carrito
</button>

          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductList;