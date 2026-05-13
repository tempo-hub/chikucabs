import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: String,
  slug: String,
  category: String,
  description: String,
  keywords: [String],
  hashtags: [String],
  content: String,
  imageId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
