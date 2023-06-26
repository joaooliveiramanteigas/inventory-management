"use client";
import { useState } from "react";
import { Product } from "@/types";
import { useRouter } from "next/navigation";

type Props = {
  products: Product[];
};

function reduceCategories(products) {
  const categories = [];

  products.forEach((product) => {
    if (!categories.includes(product.category)) {
      categories.push(product.category);
    }
  });

  return categories;
}

export default function TransactionForm({ products }: Props) {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [addedProducts, setAddedProducts] = useState<Product[]>([]);

  const handleProductClick = (product: Product) => {
    if (selectedProduct && selectedProduct._id === product._id) {
      setSelectedProduct(null);
      setQuantity(0);
    } else {
      setSelectedProduct(product);
      setQuantity(0);
    }
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setSelectedProduct(null);
    setQuantity(0);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const handleQuantityIncrement = () => {
    setQuantity(quantity + 1);
    setSelectedProduct((prevProduct) => {
      if (prevProduct) {
        return { ...prevProduct, quantity: prevProduct.quantity + 1 };
      }
      return null;
    });
  };

  const handleQuantityDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      setSelectedProduct((prevProduct) => {
        if (prevProduct) {
          return { ...prevProduct, quantity: prevProduct.quantity - 1 };
        }
        return null;
      });
    }
  };

  const handleAddProduct = () => {
    if (quantity > 0) {
      const existingProductIndex = addedProducts.findIndex(
        (product) => product._id === selectedProduct?._id
      );

      if (existingProductIndex !== -1) {
        const updatedProducts = [...addedProducts];
        updatedProducts[existingProductIndex].quantity += quantity;
        setAddedProducts(updatedProducts);
      } else {
        const addedProduct = { ...selectedProduct, quantity };
        setAddedProducts([...addedProducts, addedProduct]);
      }

      setSelectedProduct(null);
      setQuantity(0);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    const updatedProducts = addedProducts.filter(
      (product) => product._id !== productId
    );
    setAddedProducts(updatedProducts);
  };

  const handleSubmit = async () => {
    const products = addedProducts.map((addedProduct) => {
      return { ...addedProduct, productId: addedProduct._id };
    });
    const totalPrice = addedProducts.reduce(
      (total, product) =>
        total + Number(product.price) * Number(product.quantity),
      0
    );

    try {
      const response = await fetch("/api/transaction/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products, totalPrice }),
      });

      if (response.ok) {
        // Transaction created successfully
        const data = await response.json();
        console.log("Transaction created:", data);

        // Clear the added products
        setAddedProducts([]);
      } else {
        // Error creating transaction
        console.error("Error creating transaction");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const categories = reduceCategories(products);

  // Calculate the total price
  const totalPrice = addedProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const isSubmitDisabled = addedProducts.length === 0;

  return (
    <div className="flex flex-col h-screen">
      {/* Main Content */}
      <div className="flex-grow p-8">
        <h1 className="text-2xl font-bold mb-4">New Transaction</h1>

        <div className="flex items-center mb-4">
          <label htmlFor="category" className="mr-2">
            Category:
          </label>
          <select
            id="category"
            onChange={handleCategoryChange}
            className="border border-gray-300 rounded-md px-2 py-1"
          >
            <option value="">All</option>
            {categories.map((cat) => {
              return (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              );
            })}
          </select>
        </div>

        <div className="grid grid-cols-4 gap-4 product-list">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className={`product-item ${
                selectedProduct?._id === product._id ? "selected" : ""
              }`}
              onClick={() => handleProductClick(product)}
            >
              <h3>{product.name}</h3>
              <p className={selectedProduct?._id === product._id ? "bold" : ""}>
                Price: {product.price}
              </p>
            </div>
          ))}
        </div>

        {selectedProduct && (
          <div className="flex items-center mt-4">
            <div className="flex items-center mr-4">
              <button
                className="px-6 py-3 rounded-full bg-blue-500 text-white"
                onClick={handleQuantityDecrement}
              >
                -
              </button>
              <span className="px-4 py-3 mx-2 rounded bg-gray-200">
                {quantity}
              </span>
              <button
                className="px-6 py-3 rounded-full bg-blue-500 text-white"
                onClick={handleQuantityIncrement}
              >
                +
              </button>
            </div>
            <div className="flex items-center">
              <h3>Total Price:</h3>
              <p className="text-lg font-bold ml-2">
                {selectedProduct.price * quantity} EUR
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className={`${
              !selectedProduct || quantity === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white py-2 px-4 rounded shadow`}
            onClick={handleAddProduct}
            disabled={!selectedProduct || quantity === 0}
          >
            Add to Cart
          </button>
          <div>
            <p className="text-lg font-bold mb-2">Total Price:</p>
            <p className="text-lg font-bold">{totalPrice} EUR</p>
          </div>
          <button
            type="submit"
            className={`${
              isSubmitDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            } text-white py-2 px-4 rounded shadow`}
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
          >
            Submit Transaction
          </button>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Added Products:</h2>
          {addedProducts.map((product) => (
            <div key={product._id} className="flex items-center mb-2">
              <p className="mr-4">{product.name}</p>
              <p className="mr-4">Quantity: {product.quantity}</p>
              <p>Price: {product.price * product.quantity} EUR</p>
              <button
                className="ml-4 text-red-500 hover:text-red-700"
                onClick={() => handleDeleteProduct(product._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => router.push("/transaction")}
        className="mt-4 text-blue-500 hover:underline cursor-pointer"
      >
        Go to Transactions
      </button>
    </div>
  );
}
