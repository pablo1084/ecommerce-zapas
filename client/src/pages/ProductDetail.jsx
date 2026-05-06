import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/products/${id}`
        );

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

      <div className="image">
        <img
          src={product.images?.[0] || "https://placehold.co/400"}
          alt={product.name}
        />
      </div>

      <div className="info">
        <h1>{product.name}</h1>
        <p className="price">${product.price}</p>

        <p>{product.description}</p>

        <p>
          <strong>Stock:</strong> {product.stockStatus}
        </p>

      </div>

    </div>
  );
};

export default ProductDetail;