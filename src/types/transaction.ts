import mongoose, { Types } from "mongoose";

export interface Transaction {
  products: {
    productId: mongoose.Types.ObjectId;
    quantity: number;
    // Add other product-related fields as needed
    // ...
  }[];
  partyId: mongoose.Types.ObjectId;
  partyName?: string;
  // Add other transaction properties as needed
  totalPrice: number;
  createdDate: Date; // Add the createdDate field
  // ...
}

export type ActualTransactionProduct = {
  productName: any;
  productId: Types.ObjectId;
  quantity: number;
};

export type ActualTransaction = {
  products: ActualTransactionProduct[];
  totalPrice: number;
  createdDate: Date;
  partyId: Types.ObjectId;
  partyName?: string;
  id?: string | undefined;
};

export type TransactionProduct = {
  productId: Types.ObjectId;
  quantity: number;
};
