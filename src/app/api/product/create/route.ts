import TransactionModel from "@/models/Transaction";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(request: NextRequest) {
  if (request.method === "POST") {
    try {
      const { products } = await request.json();

      // Create a new transaction instance using the request body
      const transaction = new TransactionModel({ products });

      // Save the transaction to the database
      const savedTransaction = await transaction.save();

      return NextResponse.json(savedTransaction, { status: 201 });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Error creating transaction" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }
}
