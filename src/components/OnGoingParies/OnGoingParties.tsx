import { connectDB } from "@/db";
import PartyModel, { IParty } from "@/models/Party";
import Parties from "./Parties";

const getOngoingParties = async (): Promise<IParty[]> => {
  await connectDB();

  const currentDate = new Date();
  const currentMonthDate = currentDate.toISOString().slice(5, 10); // Extract month and date (MM-DD) from ISO string

  const parties = await PartyModel.find({
    $expr: {
      $and: [
        { $lte: [{ $substr: ["$period.startDate", 5, 5] }, currentMonthDate] }, // Compare only month and date
        { $gte: [{ $substr: ["$period.endDate", 5, 5] }, currentMonthDate] }, // Compare only month and date
      ],
    },
  })
    .lean()
    .exec();

  return parties;
};

export default async function OnGoingParties() {
  const onGoingParties = await getOngoingParties();

  if (!onGoingParties || onGoingParties.length === 0) {
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
