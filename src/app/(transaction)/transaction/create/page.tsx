import TransactionForm from "@/components/TransactionForm";
import { connectDB } from "@/db";
import PartyModel, { IParty } from "@/models/Party";
import ProductModel from "@/models/Product";
import { Product } from "@/types";
// import { headers } from "next/headers";

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

const getParties = async (): Promise<IParty[]> => {
  await connectDB();

  const currentDate = new Date();
  const currentMonthDate = currentDate.toISOString().slice(5, 10); // Extract month and date (MM-DD) from ISO string

  const parties = await PartyModel.find(
    {
      $expr: {
        $and: [
          {
            $lte: [{ $substr: ["$period.startDate", 5, 5] }, currentMonthDate],
          }, // Compare only month and date
          {
            $gte: [{ $substr: ["$period.endDate", 5, 5] }, currentMonthDate],
          }, // Compare only month and date
        ],
      },
    },
    { _id: 1, name: 1 }
  )
    .lean()
    .exec();

  return parties;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = {
  searchParams: { partyId: string };
};

export default async function CreateProduct({ searchParams }: Props) {
  const products = await getProducts();

  const parties = await getParties();

  const partyOptions = parties.map((party) => ({
    value: String(party._id.toString()),
    label: party.name,
  }));

  const selectedParty = searchParams.partyId || "";

  // headers();
  return (
    <TransactionForm
      products={products}
      partyOptions={partyOptions}
      selectedParty={selectedParty}
    />
  );
}
