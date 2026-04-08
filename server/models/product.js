import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stock: Number,
  brand: String,
  category: String,
  images: [String]
}, { timestamps: true });

export default mongoose.model("Product", productSchema);