import ProductModel from "@/models/Product";
import Link from "next/link";
import { deleteTransaction } from "@/app/actions";
import {
  ActualTransaction,
  ActualTransactionProduct,
  TransactionProduct,
} from "@/types";
import { getPaginatedTransactions } from "@/utils/services/transactionService";
import { getTotalTransactions } from "@/utils/services";

function getProductNames(products: ActualTransactionProduct[]): string {
  const productNames = products.map((transaction) => transaction.productName);
  return productNames.join(", ");
}

type Props = {
  searchParams: { page: string; limit: string };
};

export default async function TransactionsPage({ searchParams }: Props) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;

  const transactions = await getPaginatedTransactions(page, limit);

  // Fetch product information for each transaction
  const transactionsWithProducts = await Promise.all(
    transactions.map(async (transaction) => {
      const products = transaction.products.map(
        async (product: TransactionProduct) => {
          const foundProduct = await ProductModel.findById(product.productId);
          return {
            ...product,
            productName: foundProduct ? foundProduct.name : "Unknown",
          };
        }
      );

      const updatedTransaction = {
        ...transaction,
        products: await Promise.all(products),
      };

      return updatedTransaction;
    })
  );

  // Calculate the total number of transactions and pages
  const totalTransactions = await getTotalTransactions();
  const totalPages = Math.ceil(totalTransactions / limit);
  const currentPage = Number(page);

  console.log({ ui: transactions[0] });
  return (
    <div className="flex">
      {/* Main Content */}
      <div className="md:w-3/4 p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-4 text-center">Transactions</h1>

        {/* Transaction List */}
        <div>
          {transactionsWithProducts.map((transaction: ActualTransaction) => {
            console.log({ clientTrans: transaction.products });
            const beautifiedDate = transaction.createdDate.toLocaleString(
              "en-US",
              {
                month: "short", // Abbreviated month name (e.g., Jan, Feb)
                day: "numeric", // Numeric day of the month (e.g., 1, 2, 3)
                hour: "numeric", // Numeric hour (e.g., 1, 2, ..., 12)
                minute: "numeric", // Numeric minute (e.g., 0, 1, 2, ..., 59)
                hour12: true, // Use 12-hour clock (e.g., 1 PM instead of 13)
              }
            );
            const productNames = getProductNames(transaction.products);

            return (
              <div key={transaction.id} className="mb-4">
                <div className="flex items-center justify-between p-4 bg-white shadow rounded">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Transaction: {beautifiedDate}
                    </h3>
                    <p className="text-gray-500">
                      Product Name: {productNames}
                    </p>
                    <p className="text-gray-500 border-green-900">
                      Value: {transaction.totalPrice} EUR
                    </p>
                    {transaction.partyName && (
                      <p className="text-gray-500 border-green-900">
                        Party: {transaction.partyName}
                      </p>
                    )}
                  </div>
                  <form action={deleteTransaction}>
                    <input
                      type="hidden"
                      name="transactionId"
                      value={transaction.id}
                    />

                    {/* Delete Button */}
                    <button
                      type="submit"
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>

        {/* {transactions.length === 0 && ( */}
        <div className="flex justify-center mb-8">
          <div className="w-64 bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600">
            <Link href="/transaction/create">Add a Transaction</Link>
          </div>
        </div>
        {/* )} */}

        {/* Pagination */}
        <div className="flex justify-between mt-4">
          {currentPage > 1 && (
            <Link
              className="text-blue-500 hover:underline"
              href={`/transaction?page=${currentPage - 1}&limit=${limit}`}
            >
              Previous
            </Link>
          )}

          {currentPage < totalPages && (
            <Link
              className="text-blue-500 hover:underline"
              href={`/transaction?page=${currentPage + 1}&limit=${limit}`}
            >
              Next
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
