import mongoose from "mongoose";

const BlogSchema = mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
    default: "",
  },
  title: {
    type: String,
    required: true,
    default: "",
  },
  description: {
    type: String,
    required: true,
    default: "",
  },
  status: {
    type: String,
    required: true,
    default: "0",
    enum: ["0", "1", "2"],
  },
  created_at: {
    type: Date,
    required: true,
  },
  edited_at: {
    type: Date,
    required: true,
  },
  created_by: {
    type: String,
    required: true,
    default: "1",
    enum: ["0", "1"],
  },
  edited_by: {
    type: String,
    required: true,
    default: "1",
    enum: ["0", "1"],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // References the 'User' model
    required: true,
  },
});

const Blog = mongoose.model("Blog", BlogSchema);
export default Blog;
