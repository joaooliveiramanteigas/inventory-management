"use client";

import { createProduct } from "@/app/actions";
import Link from "next/link";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

const ProductForm = () => {
  const { pending } = useFormStatus();

  return (
    <div className="w-3/4 p-8">
      <h1 className="text-2xl font-bold mb-4">Add a Product</h1>

      <form action={createProduct} className="flex flex-col space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
          required
        />

        <input
          type="text"
          placeholder="Price"
          className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
          required
          name="price"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
        />

        <input
          type="text"
          placeholder="Category"
          className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
          required
          name="category"
        />

        <button
          type="submit"
          disabled={pending}
          className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600"
        >
          {pending ? "Submitting..." : "Submit"}
        </button>
      </form>

      <div className="flex justify-center mt-4">
        <Link href="/">
          <span className="text-blue-500 hover:underline cursor-pointer">
            Go back
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ProductForm;
