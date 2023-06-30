import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Main Content */}
      <div className="w-full md:w-3/4 p-8">
        <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
          Home
        </h1>

        {/* See Section */}
        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 mb-8">
          <div className="w-full md:w-1/2 h-12 bg-blue-500 text-white py-3 px-5 rounded shadow hover:bg-blue-600">
            <Link className="text-lg" href="/inventory">
              Products
            </Link>
          </div>
          <div className="w-full md:w-1/2 h-12 bg-green-500 text-white py-3 px-5 rounded shadow hover:bg-green-600">
            <Link className="text-lg" href="/transaction">
              Transactions
            </Link>
          </div>
          <div className="w-full md:w-1/2 h-12 bg-green-500 text-white py-3 px-5 rounded shadow hover:bg-green-600">
            <Link className="text-lg" href="/parties">
              Parties
            </Link>
          </div>
        </div>

        {/* Add Section */}
        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="w-full md:w-1/2 h-12 bg-blue-500 text-white py-3 px-5 rounded shadow hover:bg-blue-600">
            <Link className="text-lg" href="/product/create">
              Add a Product
            </Link>
          </div>
          <div className="w-full md:w-1/2 h-12 bg-green-500 text-white py-3 px-5 rounded shadow hover:bg-green-600">
            <Link className="text-lg" href="/transaction/create">
              Add a Transaction
            </Link>
          </div>
          <div className="w-full md:w-1/2 h-12 bg-green-500 text-white py-3 px-5 rounded shadow hover:bg-green-600">
            <Link className="text-lg" href="/party/create">
              Add a Party
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
