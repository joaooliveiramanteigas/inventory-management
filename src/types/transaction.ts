import mongoose from "mongoose";

export interface Transaction {
  products: {
    productId: mongoose.Types.ObjectId;
    quantity: number;
    // Add other product-related fields as needed
    // ...
  }[];
  // Add other transaction properties as needed
  totalPrice: number;
  createdDate: Date; // Add the createdDate field
  // ...
}
