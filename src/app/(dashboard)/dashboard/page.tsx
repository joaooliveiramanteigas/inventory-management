import Link from "next/link";
import { Suspense } from "react";
import ProductSales from "@/components/ProductSales/ProductSales";
import PartySales from "@/components/PartySales/PartySales";
import {
  getTotalProducts,
  getTotalRevenue,
  getTotalTransactions,
} from "@/utils/services";
import PieSkeleton from "@/components/PieSkeleton";

export const revalidate = 0;

type Props = {
  searchParams: {};
};

export default async function DashboardPage({ searchParams }: Props) {
  return (
    <div className="flex flex-col">
      {/* Main Content */}
      <div className="w-full p-4 md:p-8 md:w-3/4">
        <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
          Dashboard
        </h1>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white shadow rounded">
            <h3 className="text-lg font-semibold">Total Transactions</h3>
            <Suspense fallback={<p>Loading</p>}>
              <TotalTransactions />
            </Suspense>
          </div>
          <div className="p-4 bg-white shadow rounded">
            <h3 className="text-lg font-semibold">Total Products</h3>
            <Suspense fallback={<p>Loading</p>}>
              <TotalProducts />
            </Suspense>
          </div>
          <div className="p-4 bg-white shadow rounded">
            <h3 className="text-lg font-semibold">Total Revenue</h3>
            <Suspense fallback={<p>Loading</p>}>
              <TotalRevenue />
            </Suspense>
          </div>
        </div>

        {/* Pie chart */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Products Sales</h2>

          <Suspense fallback={<PieSkeleton />}>
            <ProductSales />
          </Suspense>
        </div>
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Party Sales</h2>

          <Suspense fallback={<PieSkeleton />}>
            <PartySales />
          </Suspense>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row justify-center mt-8 space-y-4 md:space-y-0 md:space-x-4">
          <Link href="/product/create">
            <div className="w-full lg:w-64 md:w-44 bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600">
              Add a Product
            </div>
          </Link>
          <Link href="/transaction/create">
            <div className="w-full lg:w-64 md:w-44 bg-green-500 text-white py-2 px-4 rounded shadow hover:bg-green-600">
              Add a Transaction
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

async function TotalTransactions() {
  const totalTransactions = await getTotalTransactions();

  return <p className="text-gray-500">{totalTransactions}</p>;
}

async function TotalProducts() {
  const totalProducts = await getTotalProducts();

  return <p className="text-gray-500">{totalProducts}</p>;
}

async function TotalRevenue() {
  const totalRevenue = await getTotalRevenue();

  return <p className="text-gray-500">{totalRevenue} EUR</p>;
}
