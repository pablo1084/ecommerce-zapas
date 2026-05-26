import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ProductForm from "../admin/ProductForm";
import "../../styles/productsform.css"

const CreateProduct = () => {
  const navigate = useNavigate();

  const handleCreateProduct = async (formData) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("${import.meta.env.VITE_API_URL}/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al crear producto");
      }

      toast.success("Producto creado correctamente");

      navigate("/admin/products");

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
  <div className="create-product-page">

    <button
      className="admin-back-btn"
      onClick={() => navigate(-1)}
    >
      ← Volver
    </button>

    <h1>Crear Producto</h1>

    <ProductForm onSubmit={handleCreateProduct} />
  </div>
);
};

export default CreateProduct;