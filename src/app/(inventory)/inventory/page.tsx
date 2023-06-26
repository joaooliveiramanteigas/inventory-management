import { connectDB } from "@/db";
import ProductModel from "@/models/Product";
import Link from "next/link";

export const getAllProducts = async (page = 1, limit = 10) => {
  await connectDB();

  try {
    const products = await ProductModel.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    return products;
  } catch (error) {
    console.error(error);
    return [];
  }
};

type Props = {
  searchParams: { page: string; limit: string };
};

export default async function ProductsPage({ searchParams }: Props) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;

  const products = await getAllProducts(page, limit);

  // Calculate the total number of products and pages
  const totalProducts = await ProductModel.countDocuments();
  const totalPages = Math.ceil(totalProducts / limit);
  const currentPage = Number(page);

  return (
    <div className="flex flex-col md:flex-row">
      {/* Main Content */}
      <div className="w-full p-8 md:w-3/4 ">
        <h1 className="text-2xl font-bold mb-4 text-center md:text-left">Products</h1>

        {/* Product List */}
        <div>
          {products.map((product) => (
            <div key={product._id} className="mb-4">
              <Link href={`/product/${product._id}`}>
                <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-white shadow rounded">
                  <div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-500">{product.category}</p>
                    <p className="text-gray-500">
                      Quantity: {product.quantity}
                    </p>
                  </div>
                  <p className="text-blue-500">{product.price} EUR</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="flex justify-center mb-8">
          <div className="w-64 bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600">
            <Link href="/product/create">Add a Product</Link>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-between mt-4">
          {currentPage > 1 && (
            <Link href={`/products?page=${currentPage - 1}&limit=10`}>
              <a className="text-blue-500 hover:underline">Previous</a>
            </Link>
          )}

          {currentPage < totalPages && (
            <Link href={`/products?page=${currentPage + 1}&limit=10`}>
              <a className="text-blue-500 hover:underline">Next</a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}