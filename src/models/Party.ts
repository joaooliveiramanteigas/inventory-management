import mongoose, { Document, Model, Schema } from "mongoose";

delete mongoose.models.Party;

interface IParty extends Document {
  name: string;
  description: string;
  month: string;
  period: {
    startDate: Date;
    endDate: Date;
  };
  location: string;
  __v: number;
}

// Define your party schema
const partySchema: Schema<IParty> = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  month: { type: String, required: true },
  period: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  location: { type: String, required: true },
});

// Create the Mongoose model
const PartyModel: Model<IParty> =
  mongoose.models.Party || mongoose.model<IParty>("Party", partySchema);

export default PartyModel;
