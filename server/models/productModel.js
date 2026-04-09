import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  description: String,

  price: {
    type: Number,
    required: true
  },

  stock: {
    type: Number,
    default: 0
  },

  category: String,

  sku: {
    type: String,
    unique: true,
    sparse: true
  },

  attributes: {
    type: Object,
    default: {}
  },

  images: [String],

  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

export default mongoose.model("Product", productSchema);