import ProductModel from "@/models/Product";
import Link from "next/link";

import { connectDB } from "@/db";
import { deleteProduct } from "@/app/actions";
import { Product } from "@/types";
import ProductQuantity from "./ProductQuantity";
import { notFound } from "next/navigation";

const getProductById = async (id: string): Promise<Product | undefined> => {
  await connectDB();

  let data = null;
  try {
    const product = await ProductModel.findById(id);

    if (!product) {
      // notFound();
    }

    data = product;
  } catch (error) {
    console.error(error);
  }

  return data;
};

type Props = {
  params: { id: string };
};

export default async function Product({ params }: Props) {
  const productId = params?.id;
  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start">
      {/* Main Content */}
      <div className="w-full lg:w-3/4 p-8 mx-auto lg:mx-0">
        <h1 className="text-2xl font-bold mb-4 text-center lg:text-left">
          Product Details
        </h1>

        {/* Product Details */}
        <div className="bg-white shadow p-4 rounded space-y-3 md:space-y-6">
          <h2 className="text-lg font-semibold">{product?.name}</h2>
          <p>Price: {product?.price}</p>
          <p>Category: {product?.category}</p>
          <ProductQuantity product={product} />
          {/* Add more product details as needed */}
          {/* ... */}
        </div>

        <form action={deleteProduct} className="mt-4">
          <input type="hidden" name="productId" value={productId} />
          {/* Delete Button */}
          <button
            type="submit"
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded shadow hover:bg-red-600 w-full lg:w-auto"
          >
            Delete Product
          </button>
        </form>

        {/* Back to Home */}
        <div className="flex justify-center mt-4">
          <Link
            className="text-blue-500 hover:underline cursor-pointer"
            href="/"
          >
            Go back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
