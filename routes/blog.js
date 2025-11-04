import express from "express";

import { upload } from "../middleware/multer.js";
import { addBlog, deleteBlog, getBlogs, getSingleBlog, updateBlog } from "../controllers/blog.js";

const blogRouter = express.Router();

blogRouter.post("/add", upload.single('blogImage'), addBlog);
blogRouter.get("/get", getBlogs);
blogRouter.get("/get/:id", getSingleBlog);
blogRouter.delete("/delete/:id", deleteBlog);
blogRouter.patch("/update/:id", upload.single('blogImage'), updateBlog);
export default blogRouter;