import mongoose from "mongoose";

const holidaySchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  country: { type: String, required: true },
  nights: { type: Number, required: true },
  days: { type: Number, required: true },
  includes: [String], // e.g. ["All Inclusive", "Water Villa"]
  image: String,      // Path to uploaded image
});

export default mongoose.models.Holiday || mongoose.model("Holiday", holidaySchema);
