"use client";

import { updateProductQuantity } from "@/app/actions";
import { Product } from "@/types";
import { useState } from "react";

const ProductQuantity = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(Number(product?.quantity) || 0);

  const handleQuantityIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setQuantity(quantity + 1);
  };

  const handleQuantityDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <form action={updateProductQuantity} className="flex">
      <input type="hidden" name="productId" value={product.id} />
      <p className="flex items-center">
        <button
          className="w-1/2 py-2 rounded-full bg-blue-500 text-white ml-2"
          onClick={handleQuantityDecrement}
        >
          -
        </button>
        <input
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="px-4 py-2 mx-2 rounded bg-gray-200 w-1/2 text-center"
        />
        <button
          className="w-1/2 py-2 rounded-full bg-blue-500 text-white"
          onClick={handleQuantityIncrement}
        >
          +
        </button>
        {quantity !== Number(product.quantity) && (
          <button
            className="ml-2 px-6 py-2 rounded-full bg-green-500 text-white w-full"
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
