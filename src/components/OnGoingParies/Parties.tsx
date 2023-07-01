"use client";
import { IParty } from "@/models/Party";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";


type Props = {
  parties: IParty[];
};

const Parties = ({ parties }: Props) => {
  const [currentPartyIndex, setCurrentPartyIndex] = useState(0);
  const partyCardsRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      const nextPartyIndex = (currentPartyIndex + 1) % parties.length;
      partyCardsRefs.current[nextPartyIndex]?.scrollIntoView({
        behavior: "smooth",
      });
      setCurrentPartyIndex(nextPartyIndex);
    }, 4000);

    return () => {
      clearInterval(scrollInterval);
    };
  }, [currentPartyIndex, parties]);

  return (
    <div className="flex space-x-2 p-4">
      {parties.map((party, index) => (
        <div
          key={party._id}
          className={`flex-shrink-0 ${
            index === currentPartyIndex ? "bg-gray-100" : ""
          } md:bg-transparent rounded-lg`}
          ref={(ref) => (partyCardsRefs.current[index] = ref)}
        >
          <div className="max-w-xs rounded overflow-hidden shadow-lg">
            <div className="px-5 py-3">
              <div className="font-bold text-xl mb-2 text-ellipsis">
                {party.name}
              </div>
              <p className="text-gray-700 text-base">{party.description}</p>
            </div>
            <div className="px-5 py-3">
              <p className="text-gray-700">{party.location}</p>
            </div>
            <div className="px-5 py-3">
              <p className="text-gray-700 text-ellipsis">
                {party.period.startDate.toDateString()} -{" "}
                {party.period.endDate.toDateString()}
              </p>
            </div>
            <div className="px-5 py-3">
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
  );
};

export default Parties;
