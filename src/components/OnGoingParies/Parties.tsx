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
    <div className="flex space-x-4 p-4">
      {parties.map((party, index) => (
        <div
          key={party._id}
          className={`flex-shrink-0 ${
            index === currentPartyIndex ? "bg-gray-100" : ""
          } md:bg-transparent`}
          ref={(ref) => (partyCardsRefs.current[index] = ref)}
        >
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
  );
};

export default Parties;
