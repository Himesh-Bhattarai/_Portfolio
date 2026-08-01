import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, minlength: 5 },
    description: { type: String, required: true, minlength: 10 },
    image: { type: String, required: true },
    body: { type: String, required: true, minlength: 20 },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
