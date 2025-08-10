import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Banner || mongoose.model("Banner", BannerSchema);
