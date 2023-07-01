import { connectDB } from "@/db";
import PartyModel, { IParty } from "@/models/Party";

/**
 * Retrieves a paginated list of parties.
 * @param page - The page number.
 * @param limit - The number of parties to fetch per page.
 * @returns A list of paginated parties.
 */
export const getPaginatedParties = async (page = 1, limit = 10) => {
  await connectDB();

  try {
    const parties = await PartyModel.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()
      .exec();

    const parsedParties = parties.map((party) => {
      const { _id, __v, period, ...parsedParty } = party;
      const parsedPeriod = {
        startDate: new Date(period.startDate).toLocaleDateString(),
        endDate: new Date(period.endDate).toLocaleDateString(),
      };
      return { id: _id.toString(), period: parsedPeriod, ...parsedParty };
    });

    return parsedParties;
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Retrieves all parties.
 * @returns A list of all parties.
 */
export const getAllParties = async (): Promise<IParty[]> => {
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

/**
 * Retrieves a party by its ID.
 * @param id - The ID of the party.
 * @returns The party if found, undefined otherwise.
 */
export const getPartyById = async (id: string) => {
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

/**
 * Retrieves ongoing parties based on the current date.
 * @returns A list of ongoing parties.
 */
export const getOngoingParties = async (): Promise<IParty[]> => {
  try {
    await connectDB();

    const currentDate = new Date();
    const currentMonthDate = currentDate.toISOString().slice(5, 10); // Extract month and date (MM-DD) from ISO string

    const parties = await PartyModel.find({
      $expr: {
        $and: [
          {
            $lte: [{ $substr: ["$period.startDate", 5, 5] }, currentMonthDate],
          }, // Compare only month and date
          { $gte: [{ $substr: ["$period.endDate", 5, 5] }, currentMonthDate] }, // Compare only month and date
        ],
      },
    })
      .lean()
      .exec();

    return parties;
  } catch (error) {
    console.error(error);
    return [];
  }
};
