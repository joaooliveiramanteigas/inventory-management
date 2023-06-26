import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Main Content */}
      <div className="w-full md:w-3/4 p-8">
        <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
          Home
        </h1>

        {/* Add a Product */}
        <div className="flex justify-center mb-8">
          <div className="w-72 h-12 bg-blue-500 text-white py-3 px-5 rounded shadow hover:bg-blue-600">
            <Link className="text-lg" href="/product/create">
              Add a Product
            </Link>
          </div>
        </div>

        {/* Add a Transaction */}
        <div className="flex justify-center">
          <div className="w-72 h-12 bg-green-500 text-white py-3 px-5 rounded shadow hover:bg-green-600">
            <Link className="text-lg" href="/transaction/create">
              Add a Transaction
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
