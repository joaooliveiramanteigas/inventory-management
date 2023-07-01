import TransactionForm from "@/components/TransactionForm";
import { getAllParties, getAllProducts } from "@/utils/services";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = {
  searchParams: { partyId: string };
};

export default async function CreateProduct({ searchParams }: Props) {
  const selectedParty = searchParams.partyId || "";

  const [products, parties] = await Promise.all([
    getAllProducts(),
    getAllParties(),
  ]);

  const partyOptions = parties.map((party) => ({
    value: String(party._id.toString()),
    label: party.name,
  }));

  return (
    <TransactionForm
      products={products}
      partyOptions={partyOptions}
      selectedParty={selectedParty}
    />
  );
}

export const metadata = {
  title: "New Transaction",
};
