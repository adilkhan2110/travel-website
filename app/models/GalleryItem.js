import mongoose from 'mongoose';

const GalleryItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String },
}, { timestamps: true });

export default mongoose.models.GalleryItem || mongoose.model('GalleryItem', GalleryItemSchema);
