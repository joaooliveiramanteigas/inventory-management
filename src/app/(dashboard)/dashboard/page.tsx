import { connectDB } from "@/db";
import TransactionModel from "@/models/Transaction";
import ProductModel from "@/models/Product";
import Link from "next/link";
import { Transaction } from "@/types";
import { headers } from "next/headers";

const getTotalTransactions = async () => {
  await connectDB();

  try {
    const totalTransactions = await TransactionModel.countDocuments().exec();
    return totalTransactions;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

const getTotalProducts = async () => {
  await connectDB();

  try {
    const totalProducts = await ProductModel.countDocuments();
    return totalProducts;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

const getTotalRevenue = async (): Promise<number> => {
  await connectDB();

  try {
    const transactions = await TransactionModel.find().exec();
    const totalRevenue = transactions.reduce(
      (sum, transaction: Transaction & Document) =>
        sum + transaction.totalPrice,
      0
    );
    return totalRevenue;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

export default async function DashboardPage() {
  const totalTransactions = await getTotalTransactions();
  const totalProducts = await getTotalProducts();
  const totalRevenue = await getTotalRevenue();

  // Force dynamic segment
  headers();

  return (
    <div className="flex flex-col">
      {/* Main Content */}
      <div className="w-full p-8 md:w-3/4">
        <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
          Dashboard
        </h1>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white shadow rounded">
            <h3 className="text-lg font-semibold">Total Transactions</h3>
            <p className="text-gray-500">{totalTransactions}</p>
          </div>
          <div className="p-4 bg-white shadow rounded">
            <h3 className="text-lg font-semibold">Total Products</h3>
            <p className="text-gray-500">{totalProducts}</p>
          </div>
          <div className="p-4 bg-white shadow rounded">
            <h3 className="text-lg font-semibold">Total Revenue</h3>
            <p className="text-gray-500">{totalRevenue} EUR</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row justify-center mt-8 space-y-4 md:space-y-0 md:space-x-4">
          <Link href="/product/create">
            <div className="w-full md:w-64 bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600">
              Add a Product
            </div>
          </Link>
          <Link href="/transaction/create">
            <div className="w-full md:w-64 bg-green-500 text-white py-2 px-4 rounded shadow hover:bg-green-600">
              Add a Transaction
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
