"use server";

import { cookies } from "next/headers";

import { connectDB } from "@/db";
import ProductModel from "@/models/Product";
import TransactionModel from "@/models/Transaction";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import PartyModel from "@/models/Party";

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

export async function createParty(formData: FormData) {
  // Create a new party instance using the data
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const month = formData.get("month") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const location = formData.get("location") as string;

  // Validate the data
  if (!name || !description || !month || !startDate || !endDate || !location) {
    return { error: "Required fields are missing" };
  }

  const parsedStartDate = new Date(startDate);
  const parsedEndDate = new Date(endDate);

  if (parsedStartDate >= parsedEndDate) {
    return { error: "End date must be greater than start date" };
  }

  // Create a new party instance using the retrieved data
  const party = new PartyModel({
    name,
    description,
    month,
    period: { startDate: parsedStartDate, endDate: parsedEndDate },
    location,
  });

  // Save the party to the database
  const savedParty = await party.save();

  revalidatePath("/parties");
  return redirect(`/party/${savedParty.id}`);
}

export async function deleteProduct(
  formData: FormData
): Promise<{ error: boolean } | void> {
  const productId = formData.get("productId");

  await ProductModel.findByIdAndDelete(productId);

  revalidatePath("/inventory");
  return redirect("/inventory");
}

export async function deleteParty(
  formData: FormData
): Promise<{ error: boolean } | void> {
  const partyId = formData.get("partyId");
  console.log({ partyId });

  await PartyModel.findByIdAndDelete(partyId);

  revalidatePath("/parties");
  return redirect("/parties");
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
