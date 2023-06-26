import mongoose from "@/db";

delete mongoose.models.Product;

// Define your product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String },
  category: { type: String, required: true },
  quantity: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} must be an integer",
    },
  },
});

// Create the Mongoose model
const ProductModel =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default ProductModel;
