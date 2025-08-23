import mongoose, { Schema } from "mongoose";

const carSchema = new Schema(
  {
    name: { type: String, required: true },            
    type: { type: String, required: true },            
    capacity: {
      adults: { type: Number, required: true },
      driver: { type: Number, required: true },
    },
    fuel_type: { type: String, required: true },      
    transmission: { type: String, default: "Manual" },
    ac: { type: Boolean, default: true },
    heater: { type: Boolean, default: false },
    luggage_space: { type: String, default: "Medium" },
    image: { type: String, required: true },          
    price_per_km: { type: Number, default: 0 },
    status: { type: String, default: "Available" }
  },
  { timestamps: true }
);

export default mongoose.models.Car || mongoose.model("Car", carSchema);
