"use server";

import { cookies } from "next/headers";

import { connectDB } from "@/db";
import ProductModel from "@/models/Product";
import TransactionModel from "@/models/Transaction";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Ensure the database connection is established
connectDB();

export async function createProduct(formData: FormData) {
  // Create a new product instance using the data
  const name = formData.get("name");
  const price = formData.get("price");
  const image = formData.get("image");
  const category = formData.get("category");

  // Create a new product instance using the retrieved data
  const product = new ProductModel({ name, price, image, category });

  // Save the product to the database
  const savedProduct = await product.save();

  revalidatePath("/inventory");
  return redirect(`/product/${savedProduct.id}`);
}

export async function deleteProduct(
  formData: FormData
): Promise<{ error: boolean } | void> {
  const productId = formData.get("productId");

  await ProductModel.findByIdAndDelete(productId);

  revalidatePath("/inventory");
  return redirect("/inventory");
}

export async function passwordChecker(
  formData: FormData
): Promise<{ error: boolean } | void> {
  const password = formData.get("password");

  const isCorrect = password === "qwerty123456";

  if (isCorrect) {
    cookies().set("auth", "lee");
    return redirect("/");
  } else {
    return redirect("/landing");
  }
}

export async function updateProductQuantity(
  formData: FormData
): Promise<{ error: boolean } | void> {
  const productId = formData.get("productId");
  const quantity = formData.get("quantity");

  await ProductModel.findByIdAndUpdate(productId, { quantity: quantity });

  revalidatePath("/inventory");
  revalidatePath("/product/[id]");
  return redirect("/inventory");
}

export const deleteTransaction = async (formData: FormData): Promise<void> => {
  const transactionId = formData.get("transactionId");

  // Find the transaction to be deleted
  const transaction = await TransactionModel.findById(transactionId);
  if (!transaction) {
    throw new Error("Transaction not found");
  }

  // Delete the transaction
  await TransactionModel.findByIdAndDelete(transactionId);

  revalidatePath("/dashboard");
  revalidatePath("/transaction");
  return redirect("/transaction");
};
