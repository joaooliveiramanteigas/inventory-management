import TransactionForm from "@/components/TransactionForm";
import { connectDB } from "@/db";
import ProductModel from "@/models/Product";
import { Product } from "@/types";

const getProducts = async (): Promise<Product[]> => {
  await connectDB();

  try {
    const products = await ProductModel.find();
    return products;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default async function CreateProduct() {
  const products = await getProducts();

  return <TransactionForm products={products} />;
}
