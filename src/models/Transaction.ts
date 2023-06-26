import { Transaction } from "@/types/transaction";
import mongoose, { Document, Schema } from "mongoose";

delete mongoose.models.Transaction;

export interface ITransaction extends Document {
  toJSON(): any;
  // Add other fields as needed
}

const transactionSchema = new Schema<Transaction>({
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      // Add other product-related fields as needed
      // ...
    },
  ],
  // Add other transaction properties as needed
  // ...
  totalPrice: {
    type: Number,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now, // Set the default value as the current date and time
  },
});

transactionSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

// Define the transaction model
const TransactionModel =
  mongoose.models.TransactionModel ||
  mongoose.model<Transaction & Document>("Transaction", transactionSchema);

export default TransactionModel;
