import { getPaginatedParties, getTotalParties } from "@/utils/services";
import Link from "next/link";

type Props = {
  searchParams: { page: string; limit: string };
};

export default async function PartiesPage({ searchParams }: Props) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;

  const parties = await getPaginatedParties(page, limit);

  // Calculate the total number of parties and pages
  const totalParties = await getTotalParties();
  const totalPages = Math.ceil(totalParties / limit);
  const currentPage = Number(page);

  return (
    <div className="flex flex-col md:flex-row">
      {/* Main Content */}
      <div className="w-full p-4 md:p-8 md:w-3/4">
        <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
          Parties
        </h1>

        {/* Party List */}
        <div>
          {parties.map((party) => (
            <div key={party.id} className="mb-4">
              <Link href={`/party/${party.id}`}>
                <div className="flex flex-col items-center justify-between p-4 bg-white shadow rounded">
                  <div className="flex w-full mb-2 justify-between  sm:mb-0">
                    <h3 className="text-lg font-semibold">{party.name}</h3>
                    <p className="text-gray-500">{party.location}</p>
                  </div>
                  <div className="flex w-full justify-between ">
                    <p className="text-gray-500">
                      {party.period.startDate} - {party.period.endDate}
                    </p>
                    {/* Add more party details as needed */}
                    {/* ... */}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* {parties.length === 0 && ( */}
        <div className="flex justify-center mb-8">
          <div className="w-64 bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600">
            <Link href="/party/create">Add a Party</Link>
          </div>
        </div>
        {/* )} */}

        {/* Pagination */}
        <div className="flex justify-between mt-4">
          {currentPage > 1 && (
            <Link
              className="text-blue-500 hover:underline"
              href={`/parties?page=${currentPage - 1}&limit=10`}
            >
              Previous
            </Link>
          )}

          {currentPage < totalPages && (
            <Link
              className="text-blue-500 hover:underline"
              href={`/parties?page=${currentPage + 1}&limit=10`}
            >
              Next
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Parties",
};
