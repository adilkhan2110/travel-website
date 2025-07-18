import mongoose from "mongoose";

const visaPackageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    days: { type: Number, required: true },
    priceINR: { type: Number, required: true },
    processing: { type: Number, required: true },
    description: { type: String, required: true },
    validity: { type: String, required: true },
    image: { type: String, required: true },
    requirements: { type: [String], required: true },
  },
  { timestamps: true }
);

export default mongoose.models.VisaPackage ||
  mongoose.model("VisaPackage", visaPackageSchema);
