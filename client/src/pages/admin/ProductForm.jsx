import { useEffect, useState } from "react";

const ProductForm = ({
  onSubmit,
  initialData = null,
  buttonText = "Guardar",
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    sku: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        price: initialData.price || "",
        stock: initialData.stock || "",
        category: initialData.category || "",
        sku: initialData.sku || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={formData.name}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Descripción"
        value={formData.description}
        onChange={handleChange}
      />

      <input
        type="number"
        name="price"
        placeholder="Precio"
        value={formData.price}
        onChange={handleChange}
      />

      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={formData.stock}
        onChange={handleChange}
      />

      <input
        type="text"
        name="category"
        placeholder="Categoría"
        value={formData.category}
        onChange={handleChange}
      />

      <input
        type="text"
        name="sku"
        placeholder="SKU"
        value={formData.sku}
        onChange={handleChange}
      />

      <button type="submit">
        {buttonText}
      </button>
    </form>
  );
};

export default ProductForm;