import mongoose from "mongoose";

const sightSeenSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    description: { type: String, required: true },

    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.sightSeen ||
  mongoose.model("sightSeen", sightSeenSchema);
