import { connectDB } from "@/db";
import TransactionModel from "@/models/Transaction";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") || "/";

  await connectDB();

  console.log({ method: request.method });
  try {
    const { products, totalPrice, partyId } = await request.json();

    // Create a new transaction instance using the request body
    const transaction = new TransactionModel({ products, totalPrice });

    if (partyId) {
      transaction.partyId = partyId;
    }

    // Save the transaction to the database
    await transaction.save();

    // not working
    revalidatePath("/transaction");
    revalidatePath("/dashboard");

    revalidateTag(path);
    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating transaction" },
      { status: 500 }
    );
  }
}
