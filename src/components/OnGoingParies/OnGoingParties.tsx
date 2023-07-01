import { connectDB } from "@/db";
import PartyModel, { IParty } from "@/models/Party";
import Link from "next/link";

const getOngoingParties = async (): Promise<IParty[]> => {
  await connectDB();
  
  const currentDate = new Date();
  const parties = await PartyModel.find({
    "period.startDate": { $lte: currentDate },
    "period.endDate": { $gte: currentDate },
  })
    .lean()
    .exec();

  return parties;
};

export default async function OnGoingParties() {
  const onGoingParties = await getOngoingParties();

  if (!onGoingParties) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">No ongoing parties at the moment.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex space-x-4 p-4">
        {onGoingParties.map((party) => (
          <div key={party._id} className="flex-shrink-0">
            <div className="max-w-xs rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{party.name}</div>
                <p className="text-gray-700 text-base">{party.description}</p>
              </div>
              <div className="px-6 py-4">
                <p className="text-gray-700">Location: {party.location}</p>
              </div>
              <div className="px-6 py-4">
                <p className="text-gray-700">
                  Period: {party.period.startDate.toDateString()} -{" "}
                  {party.period.endDate.toDateString()}
                </p>
              </div>
              <div className="px-6 py-4">
                <Link
                  className="text-blue-500 hover:underline"
                  href={`/party/${party._id}`}
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
