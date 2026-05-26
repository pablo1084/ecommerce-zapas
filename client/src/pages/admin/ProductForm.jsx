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
    images: [],
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        price: initialData.price || "",
        stock: initialData.stock || "",
        category: initialData.category || "",
        sku: initialData.sku || "",
        images: initialData.images || [],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImagesUpload = async (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    try {
      setUploading(true);

      const token = localStorage.getItem("token");

      const uploadData = new FormData();

      files.forEach((file) => {
        uploadData.append("images", file);
      });

      const res = await fetch(
        "${import.meta.env.VITE_API_URL}/products/upload-image",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: uploadData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Error subiendo imágenes");
      }

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...data.images],
      }));

    } catch (error) {
      console.error(error);

    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
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

      <div className="image-upload-section">

        <label className="upload-label">
          Imágenes del producto
        </label>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImagesUpload}
        />

        {uploading && (
          <p className="uploading-text">
            Subiendo imágenes...
          </p>
        )}

        <div className="image-preview-grid">
          {formData.images.map((img, index) => (
            <div
              key={index}
              className="preview-image-container"
            >
              <img src={img} alt="preview" />

              <button
                type="button"
                className="remove-image-btn"
                onClick={() => handleRemoveImage(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

      </div>

      <button type="submit">
        {buttonText}
      </button>

    </form>
  );
};

export default ProductForm;