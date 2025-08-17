import mongoose from 'mongoose';

const HeaderBannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
}, { timestamps: true });

 
export default mongoose.models.HeaderBanner || mongoose.model("HeaderBanner", HeaderBannerSchema);
