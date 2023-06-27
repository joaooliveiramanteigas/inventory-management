import TransactionForm from "@/components/TransactionForm";
import { connectDB } from "@/db";
import ProductModel from "@/models/Product";
import { Product } from "@/types";
import { headers } from "next/headers";

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

export const dynamic = 'force-dynamic'
export const revalidate = 0;

type Props = {
  searchParams: {};
};

export default async function CreateProduct({ searchParams }: Props) {
  const products = await getProducts();

  headers();
  return <TransactionForm products={products} />;
}
