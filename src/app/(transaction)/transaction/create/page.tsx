import TransactionForm from "@/components/TransactionForm";
import { connectDB } from "@/db";
import ProductModel, { IProduct } from "@/models/Product";
import { Product } from "@/types";
import { headers } from "next/headers";

const getProducts = async () => {
  await connectDB();

  try {
    const products = await ProductModel.find().lean().exec();

    const parsedProducts = products.map((product) => {
      const { _id, __v, image, ...parsedProduct } = product;
      return {
        id: _id.toString(),
        image: image || "", // Provide a default value for image if it's undefined
        ...parsedProduct,
      } as Product;
    });
    return parsedProducts;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = {
  searchParams: {};
};

export default async function CreateProduct({ searchParams }: Props) {
  const products = await getProducts();

  headers();
  return <TransactionForm products={products} />;
}
