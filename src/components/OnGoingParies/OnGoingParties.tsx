import Parties from "./Parties";
import { getOngoingParties } from "@/utils/services";

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
