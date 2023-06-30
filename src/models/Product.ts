import mongoose from "@/db";
import { Model, Schema } from "mongoose";

delete mongoose.models.Product;
export interface IProduct extends Document {
  name: string;
  price: string;
  image?: string;
  category: string;
  quantity: number;
  __v?: number;
}

// Define your product schema
const productSchema: Schema<IProduct> = new mongoose.Schema({
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
const ProductModel: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default ProductModel;
