import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/productModel.js";

dotenv.config();

const products = [
  {
    name: "Adidas Yeezy Boost 700 V2 Oreo",
    price: 125000,
    stock: 50,
    category: "zapatillas",
    sku: "YZ700-OREO-001",
    attributes: { brand: "Adidas", model: "Yeezy Boost 700 V2", color: "Oreo", sizes: "40-44" },
    images: []
  },
  {
    name: "Adidas Yeezy Boost 700 V2 Bred Black",
    price: 125000,
    stock: 50,
    category: "zapatillas",
    sku: "YZ700-BRED-002",
    attributes: { brand: "Adidas", model: "Yeezy Boost 700 V2", color: "Bred Black", sizes: "40-44" },
    images: []
  },
  {
    name: "Adidas Yeezy Boost 700 V2 Beluga",
    price: 125000,
    stock: 50,
    category: "zapatillas",
    sku: "YZ700-BELUGA-003",
    attributes: { brand: "Adidas", model: "Yeezy Boost 700 V2", color: "Beluga", sizes: "40-44" },
    images: []
  },
  {
    name: "Air Jordan 4 Retro Off White Sail",
    price: 118000,
    stock: 50,
    category: "zapatillas",
    sku: "AJ4-OFFWHITE-004",
    attributes: { brand: "Nike", model: "Air Jordan 4 Retro", color: "Off White Sail", sizes: "35-40" },
    images: []
  },
  {
    name: "Air Jordan 4 Retro Royalty Black",
    price: 118000,
    stock: 50,
    category: "zapatillas",
    sku: "AJ4-ROYALTY-005",
    attributes: { brand: "Nike", model: "Air Jordan 4 Retro", color: "Royalty Black", sizes: "40-42" },
    images: []
  },
  {
    name: "Air Jordan 4 Retro Bred",
    price: 118000,
    stock: 50,
    category: "zapatillas",
    sku: "AJ4-BRED-006",
    attributes: { brand: "Nike", model: "Air Jordan 4 Retro", color: "Bred", sizes: "43" },
    images: []
  },
  {
    name: "Air Jordan 4 Retro Cactus Jack",
    price: 118000,
    stock: 50,
    category: "zapatillas",
    sku: "AJ4-CACTUS-007",
    attributes: { brand: "Nike", model: "Air Jordan 4 Retro", color: "Cactus Jack", sizes: "40-42" },
    images: []
  },
  {
    name: "Air Jordan 4 Retro Lightning",
    price: 118000,
    stock: 50,
    category: "zapatillas",
    sku: "AJ4-LIGHTNING-008",
    attributes: { brand: "Nike", model: "Air Jordan 4 Retro", color: "Lightning", sizes: "40-44" },
    images: []
  },
  {
    name: "Air Jordan 1 High Dior",
    price: 118000,
    stock: 50,
    category: "zapatillas",
    sku: "AJ1-DIOR-009",
    attributes: { brand: "Nike", model: "Air Jordan 1 High", color: "Dior", sizes: "42" },
    images: []
  },
  {
    name: "Air Jordan 1 High Dark Mocha",
    price: 118000,
    stock: 50,
    category: "zapatillas",
    sku: "AJ1-MOCHA-010",
    attributes: { brand: "Nike", model: "Air Jordan 1 High", color: "Dark Mocha", sizes: "42" },
    images: []
  },
  {
    name: "Air Jordan 1 High Fearless",
    price: 99000,
    stock: 50,
    category: "zapatillas",
    sku: "AJ1-FEARLESS-011",
    attributes: { brand: "Nike", model: "Air Jordan 1 High", color: "Fearless", sizes: "41-42" },
    images: []
  },
  {
    name: "Air Jordan 1 Mid Union Royal",
    price: 118000,
    stock: 50,
    category: "zapatillas",
    sku: "AJ1-UNION-012",
    attributes: { brand: "Nike", model: "Air Jordan 1 Mid", color: "Union Royal", sizes: "40-42" },
    images: []
  },
  {
    name: "Air Jordan 1 Low Travis Scott Reverse Mocha",
    price: 118000,
    stock: 50,
    category: "zapatillas",
    sku: "AJ1-TRAVIS-013",
    attributes: { brand: "Nike", model: "Air Jordan 1 Low", color: "Reverse Mocha", sizes: "43-44" },
    images: []
  },
  {
    name: "Nike SB Dunk Low Panda Black",
    price: 118000,
    stock: 50,
    category: "zapatillas",
    sku: "DUNK-PANDA-014",
    attributes: { brand: "Nike", model: "SB Dunk Low", color: "Panda Black", sizes: "40-45" },
    images: []
  },
  {
    name: "Nike SB Dunk Low Grey Fog",
    price: 118000,
    stock: 50,
    category: "zapatillas",
    sku: "DUNK-GREY-015",
    attributes: { brand: "Nike", model: "SB Dunk Low", color: "Grey Fog", sizes: "41-43" },
    images: []
  },
  {
    name: "Air Force 1 Supreme White",
    price: 118000,
    stock: 50,
    category: "zapatillas",
    sku: "AF1-WHITE-016",
    attributes: { brand: "Nike", model: "Air Force 1", color: "Supreme White", sizes: "40-44" },
    images: []
  },
  {
    name: "Air Force 1 Supreme Black",
    price: 118000,
    stock: 50,
    category: "zapatillas",
    sku: "AF1-BLACK-017",
    attributes: { brand: "Nike", model: "Air Force 1", color: "Supreme Black", sizes: "40-44" },
    images: []
  },
  {
    name: "Air Force 1 Louis Vuitton Paris",
    price: 118000,
    stock: 50,
    category: "zapatillas",
    sku: "AF1-LV-018",
    attributes: { brand: "Nike", model: "Air Force 1", color: "Louis Vuitton", sizes: "41-42" },
    images: []
  },
  {
    name: "Air Force 1 Ambush Black",
    price: 139900,
    stock: 50,
    category: "zapatillas",
    sku: "AF1-AMBUSH-019",
    attributes: { brand: "Nike", model: "Air Force 1", color: "Ambush Black", sizes: "36-44" },
    images: []
  },
  {
    name: "Air Force 1 React White",
    price: 110000,
    stock: 50,
    category: "zapatillas",
    sku: "AF1-REACT-020",
    attributes: { brand: "Nike", model: "Air Force 1", color: "React White", sizes: "40-44" },
    images: []
  }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany(); // ⚠️ borra todo (opcional)

    await Product.insertMany(products);

    console.log("✅ Productos cargados correctamente");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();