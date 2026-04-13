import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  name: String,
  price: Number,
  quantity: Number
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [orderItemSchema],

  total: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ["pending", "paid", "cancelled"],
    default: "pending"
  }

}, { timestamps: true });

export default mongoose.model("Order", orderSchema);