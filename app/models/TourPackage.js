import mongoose from "mongoose";

const TourPackageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    priceINR: { type: Number, required: true },
    nights: { type: Number, required: true },
    days: { type: Number, required: true },
    bannerImage: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.TourPackage ||
  mongoose.model("TourPackage", TourPackageSchema);
