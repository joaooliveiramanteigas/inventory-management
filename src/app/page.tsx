import LoadingSkeleton from "@/components/OnGoingParies/LoadingSkeleton";
import OnGoingParties from "@/components/OnGoingParies/OnGoingParties";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Main Content */}
      <div className="w-full md:w-3/4 p-4 md:8">
        <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
          Home
        </h1>

        {/* Shortcut section */}
        <section className="md:py-3 py-1">
          {/* See Section */}
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 mb-8">
            <Link
              className="text-lg w-full md:w-1/2 h-12 bg-blue-500 text-white py-3 px-5 rounded shadow hover:bg-blue-600"
              href="/inventory"
            >
              Products
            </Link>
            <Link
              className="text-lg w-full md:w-1/2 h-12 bg-blue-500 text-white py-3 px-5 rounded shadow hover:bg-blue-600"
              href="/transaction"
            >
              Transactions
            </Link>
            <Link
              className="text-lg w-full md:w-1/2 h-12 bg-blue-500 text-white py-3 px-5 rounded shadow hover:bg-blue-600"
              href="/parties"
            >
              Parties
            </Link>
          </div>

          {/* Add Section */}
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <Link
              className="text-lg w-full md:w-1/2 h-12 bg-blue-500 text-white py-3 px-5 rounded shadow hover:bg-blue-600"
              href="/product/create"
            >
              Add a Product
            </Link>
            <Link
              className="text-lg w-full md:w-1/2 h-12 bg-blue-500 text-white py-3 px-5 rounded shadow hover:bg-blue-600"
              href="/transaction/create"
            >
              Add a Transaction
            </Link>
            <Link
              className="text-lg w-full md:w-1/2 h-12 bg-blue-500 text-white py-3 px-5 rounded shadow hover:bg-blue-600"
              href="/party/create"
            >
              Add a Party
            </Link>
          </div>
        </section>

        {/* On going parties section */}
        <section className="md:py-3 py-1">
          <h1 className="text-2xl font-bold my-4 text-center md:text-left">
            On going parties
          </h1>
          <Suspense fallback={<LoadingSkeleton />}>
            <OnGoingParties />
          </Suspense>
        </section>
      </div>
    </div>
  );
}
