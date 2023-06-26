"use client";

import { updateProductQuantity } from "@/app/actions";
import { useState } from "react";

const ProductQuantity = ({ product }) => {
  const [quantity, setQuantity] = useState(product?.quantity || 0);

  const handleQuantityIncrement = (e) => {
    e.preventDefault();
    setQuantity(quantity + 1);
  };

  const handleQuantityDecrement = (e) => {
    e.preventDefault();
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  console.log({ product });

  return (
    <form action={updateProductQuantity} className="flex flex-col sm:flex-row items-center">
      <input type="hidden" name="productId" value={product._id} />
      <p className="flex items-center mb-2 sm:mb-0">
        Quantity:
        <button
          className="px-6 py-2 sm:py-3 rounded-full bg-blue-500 text-white ml-2"
          onClick={handleQuantityDecrement}
        >
          -
        </button>
        <input
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="px-4 py-2 sm:py-3 mx-2 rounded bg-gray-200 w-full sm:w-auto"
        />
        <button
          className="px-6 py-2 sm:py-3 rounded-full bg-blue-500 text-white"
          onClick={handleQuantityIncrement}
        >
          +
        </button>
        {quantity !== product.quantity && (
          <button
            className="ml-2 sm:ml-4 px-6 py-2 sm:py-3 rounded-full bg-green-500 text-white w-full sm:w-auto"
            type="submit"
          >
            Save
          </button>
        )}
      </p>
    </form>
  );
};
export default ProductQuantity;