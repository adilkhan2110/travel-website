import mongoose from "mongoose";

const holidaySchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  country: { type: String, required: true },
  nights: { type: Number, required: true },
  days: { type: Number, required: true },
  includes: [String],  
  image: String,       
});

export default mongoose.models.Holiday || mongoose.model("Holiday", holidaySchema);
