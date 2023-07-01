import PartyModel from "@/models/Party";
import Link from "next/link";
import { connectDB } from "@/db";
import { notFound } from "next/navigation";
import { deleteParty } from "@/app/actions";

const getPartyById = async (id: string) => {
  await connectDB();

  try {
    const party = await PartyModel.findById(id).lean();

    if (!party) {
      return undefined;
    }

    const { _id, __v, period, ...parsedParty } = party;
    const parsedPeriod = {
      startDate: period.startDate.toString(),
      endDate: period.endDate.toString(),
    };

    return { id: _id.toString(), period: parsedPeriod, ...parsedParty };
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

type Props = {
  params: { id: string };
};

const PartyDetailsPage = async ({ params }: Props) => {
  const { id } = params;

  const party = await getPartyById(id);

  if (!party) {
    notFound();
  }

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start">
      {/* Main Content */}
      <div className="w-full lg:w-3/4 p-8 mx-auto lg:mx-0">
        <h1 className="text-2xl font-bold mb-4 text-center lg:text-left">
          Party Details
        </h1>

        {/* Party Details */}
        <div className="bg-white shadow p-4 rounded space-y-3 md:space-y-6">
          <h2 className="text-lg font-semibold">{party.name}</h2>
          <p>Description: {party.description}</p>
          <p>Month: {party.month}</p>
          <p>
            {new Date(party.period.startDate).toLocaleDateString()} -{" "}
            {new Date(party.period.endDate).toLocaleDateString()}
          </p>
          <p>Location: {party.location}</p>
          {/* Add more party details as needed */}
          {/* ... */}
        </div>
        <form action={deleteParty} className="mt-4">
          <input type="hidden" name="partyId" value={party.id} />
          {/* Delete Button */}
          <button
            type="submit"
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded shadow hover:bg-red-600 w-full lg:w-auto"
          >
            Delete
          </button>
        </form>

        {/* Back to Parties */}
        <div className="flex justify-center mt-4">
          <Link href="/parties">
            <span className="text-blue-500 hover:underline cursor-pointer">
              Go back to Parties
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PartyDetailsPage;
