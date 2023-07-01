import { connectDB } from "@/db";
import TransactionModel from "@/models/Transaction";
import { Transaction } from "@/types";

/**
 * Get paginated transactions.
 * @param {number} page - The page number.
 * @param {number} limit - The number of transactions per page.
 * @returns {Promise<Transaction[]>} The paginated transactions.
 */
export const getPaginatedTransactions = async (
  page = 1,
  limit = 10
): Promise<Transaction[]> => {
  await connectDB();

  try {
    const transactions = await TransactionModel.find()
      .sort({ createdDate: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("partyId", "name") // Populate the "partyId" field with the "name" field of the party
      .exec();

    const plainTransactions = transactions.map((transaction: any) => {
      const { partyId, ...transactionData } = transaction.toJSON();
      const partyName = partyId ? partyId.name : ""; // Get the party name if "partyId" exists
      return { ...transactionData, id: transaction._id, partyName };
    });

    return plainTransactions;
  } catch (error) {
    console.error(error);
    return [];
  }
};
