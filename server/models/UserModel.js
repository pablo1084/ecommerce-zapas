import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  role: {
    type: String,
    enum: ["user", "admin", "superadmin"],
    default: "user"
  },
  isBlocked: {
  type: Boolean,
  default: false
},
isVerified: {
  type: Boolean,
  default: false
},

verificationToken: {
  type: String
}
}, { timestamps: true });

export default mongoose.model("User", userSchema);