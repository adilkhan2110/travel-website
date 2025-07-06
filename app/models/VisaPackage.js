import mongoose from "mongoose";

const visaPackageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    days: { type: Number, required: true },
    nights: { type: Number, required: true },
    image: { type: String, required: true },
    priceINR: { type: Number, required: true },
    description: { type: String, required: true }, // HTML content
  },
  { timestamps: true }
);

export default mongoose.models.VisaPackage ||
  mongoose.model("VisaPackage", visaPackageSchema);
