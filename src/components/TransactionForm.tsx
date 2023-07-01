"use client";
import { useState } from "react";
import { Product } from "@/types";
import { useRouter } from "next/navigation";

type Props = {
  products: Product[];
  selectedParty: string;
  partyOptions: {
    value: string;
    label: string;
  }[];
};

function reduceCategories(products: Product[]): string[] {
  const categories: string[] = [];

  products.forEach((product) => {
    if (!categories.includes(product.category)) {
      categories.push(product.category);
    }
  });

  return categories;
}

export default function TransactionForm({
  products,
  partyOptions,
  selectedParty: chosenParty,
}: Props) {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedParty, setSelectedParty] = useState<string>(chosenParty);
  const [addedProducts, setAddedProducts] = useState<Product[]>([]);

  const handleProductClick = (product: Product) => {
    if (selectedProduct && selectedProduct.id === product.id) {
      setSelectedProduct(null);
      setQuantity(0);
    } else {
      setSelectedProduct(product);
      setQuantity(0);
    }
  };

  const handlePartyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    setSelectedParty(event.target.value);
    router.push(`/transaction/create?partyId=${event.target.value}`);
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
        return { ...prevProduct, quantity: Number(prevProduct.quantity) + 1 };
      }
      return null;
    });
  };

  const handleQuantityDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      setSelectedProduct((prevProduct) => {
        if (prevProduct) {
          return {
            ...prevProduct,
            quantity: String(Number(prevProduct.quantity) - 1),
          };
        }
        return null;
      });
    }
  };

  const handleAddProduct = () => {
    if (quantity > 0 && selectedProduct) {
      const existingProductIndex = addedProducts.findIndex(
        (product) => product.id === selectedProduct?.id
      );

      if (existingProductIndex !== -1) {
        const updatedProducts = [...addedProducts];
        const existingQuantity = Number(
          updatedProducts[existingProductIndex].quantity
        );

        if (!isNaN(existingQuantity)) {
          updatedProducts[existingProductIndex].quantity =
            existingQuantity + quantity;
        } else {
          updatedProducts[existingProductIndex].quantity = quantity;
        }

        setAddedProducts(updatedProducts);
      } else {
        // ensure we only take the fields that are part of the Product type
        const { id, name, price, image, category } = selectedProduct;
        const addedProduct = {
          id,
          name,
          price,
          image,
          category,
          quantity: Number(quantity),
        };

        setAddedProducts([...addedProducts, addedProduct]);
      }

      setSelectedProduct(null);
      setQuantity(0);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    const updatedProducts = addedProducts.filter(
      (product) => product.id !== productId
    );
    setAddedProducts(updatedProducts);
  };

  const handleSubmit = async () => {
    const products = addedProducts.map((addedProduct) => {
      return { ...addedProduct, productId: addedProduct.id };
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
        body: JSON.stringify({ products, totalPrice, partyId: selectedParty }),
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
    (total, product) =>
      total + Number(product.price) * Number(product.quantity),
    0
  );

  const isSubmitDisabled = addedProducts.length === 0;

  return (
    <div className="flex flex-col h-screen">
      {/* Main Content */}
      <div className="flex-grow p-8">
        <h1 className="text-2xl font-bold mb-4">New Transaction</h1>

        <div className="flex flex-col md:flex-row md:justify-between mb-4">
          <div className="flex items-center mb-2 md:mb-0">
            <label htmlFor="category" className="mr-2 text-center w-full">
              Category
            </label>
            <select
              id="category"
              onChange={handleCategoryChange}
              className="border border-gray-300 rounded-md px-2 py-1 w-full"
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
          <div className="flex items-center mb-2 md:mb-0 md:ml-4">
            <label htmlFor="partyName" className="mr-2 text-center w-full">
              Party
            </label>
            <select
              id="partyName"
              onChange={handlePartyChange}
              className="border border-gray-300 rounded-md px-2 py-1 w-full"
              value={selectedParty}
            >
              <option value="">All</option>
              {partyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 product-list">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`product-item ${
                selectedProduct?.id === product.id ? "selected" : ""
              }`}
              onClick={() => handleProductClick(product)}
            >
              <h3>{product.name}</h3>
              <p className={selectedProduct?.id === product.id ? "bold" : ""}>
                Price: {product.price}
              </p>
            </div>
          ))}
        </div>

        {selectedProduct && (
          <div className="flex flex-col sm:flex-row items-center mt-4">
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
                {Number(selectedProduct.price) * quantity} EUR
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between mt-4">
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
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Added Products:</h2>
          {addedProducts.map((product) => (
            <div
              key={product.id}
              className="border border-gray-300 rounded p-4 mb-4 flex flex-col sm:flex-row items-center justify-between"
            >
              <div className="flex w-full sm:flex-row mb-2 justify-between md:justify-start sm:mb-0">
                <p className="font-bold mr-2">{product.name}</p>
                <p>{product.quantity}</p>
              </div>
              <div className="flex w-full sm:flex-row justify-between md:justify-end">
                <p className="mr-4">
                  {Number(product.price) * Number(product.quantity)}€
                </p>
                <button
                  className="ml-auto text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between mt-4">
          <div className="text-right">
            <p className="text-lg font-bold">Total Price: {totalPrice} EUR</p>
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
