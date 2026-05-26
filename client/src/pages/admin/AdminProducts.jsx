import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../components/ConfirmModal";
import AdminTableSkeleton from "../../components/AdminTableSkeleton";
import "../../styles/adminproducts.css"

const AdminProducts = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/products/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

const handleDelete = async () => {
  if (!selectedProduct) return;

  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:3000/api/products/${selectedProduct._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error);
    }

    toast.success("Producto desactivado");

    setShowModal(false);
    setSelectedProduct(null);

    fetchProducts();

  } catch (error) {
    toast.error(error.message);
  }
};

const handleRestore = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:3000/api/products/restore/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error);
    }

    toast.success("Producto reactivado");

    fetchProducts();

  } catch (error) {
    toast.error(error.message);
  }
};

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
  return (
    <div className="admin-products">
      <h1>Panel Admin - Productos</h1>

      <AdminTableSkeleton />
    </div>
  );
}

  return (
    <div className="admin-products">
      <h1>Panel Admin - Productos</h1>
      <button
  className="create-product-btn"
  onClick={() => navigate("/admin/products/create")}
>
  ➕ Nuevo producto
</button>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>{p.stock}</td>
              <td>{p.category}</td>
              <td>
  <span
    className={`status-badge ${
      p.isActive ? "active" : "inactive"
    }`}
  >
    {p.isActive ? "Activo" : "Inactivo"}
  </span>
</td>
              <td>
                <button
  onClick={() => navigate(`/admin/products/edit/${p._id}`)}
>
  ✏ Editar
</button>
                {p.isActive ? (
  <button
    className="delete-btn"
    onClick={() => {
      setSelectedProduct(p);
      setShowModal(true);
    }}
  >
    🗑 Desactivar
  </button>
) : (
  <button
    className="restore-btn"
    onClick={() => handleRestore(p._id)}
  >
    ♻ Reactivar
  </button>
)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
  <ConfirmModal
    title="Desactivar producto"
    message={`¿Seguro que querés desactivar "${selectedProduct?.name}"?`}
    onConfirm={handleDelete}
    onCancel={() => {
      setShowModal(false);
      setSelectedProduct(null);
    }}
  />
)}
    </div>
  );
};

export default AdminProducts;