import TransactionModel from "@/models/Transaction";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log({ method: request.method });
  try {
    const { products, totalPrice } = await request.json();

    console.log("1");

    // Create a new transaction instance using the request body
    const transaction = new TransactionModel({ products, totalPrice });
    console.log("2");

    // Save the transaction to the database
    const savedTransaction = await transaction.save();

    revalidatePath("/transaction");
    revalidatePath("/dashboard");
    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating transaction" },
      { status: 500 }
    );
  }
}
