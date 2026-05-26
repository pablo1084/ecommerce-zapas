import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ProductForm from "../admin/ProductForm";
import "../../styles/productsform.css"

const EditProduct = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/products/admin/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Error al obtener producto");
    }

    setProduct(data);

  } catch (error) {
    toast.error(error.message);

  } finally {
    setLoading(false);
  }
};

  const handleEditProduct = async (formData) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al actualizar");
      }

      toast.success("Producto actualizado");

      navigate("/admin/products");

    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (loading) return <p>Cargando producto...</p>;

  return (
  <div className="edit-product-page">

    <button
      className="admin-back-btn"
      onClick={() => navigate(-1)}
    >
      ← Volver
    </button>

    <h1>Editar Producto</h1>

    <ProductForm
      initialData={product}
      onSubmit={handleEditProduct}
      buttonText="Guardar cambios"
    />
  </div>
);
};

export default EditProduct;