import { connectDB } from "@/db";
import PartyModel, { IParty } from "@/models/Party";
import Parties from "./Parties";

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
    <div>
      <p className="text-gray-500 text-sm mb-2">
        Scroll horizontally to see more parties
      </p>
      <div className="overflow-x-auto">
        <Parties parties={onGoingParties} />
      </div>
    </div>
  );
}
