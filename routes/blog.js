import express from "express";

import { upload } from "../middleware/multer.js";
import { addBlog } from "../controllers/blog.js";

const blogRouter = express.Router();

blogRouter.post("/add", upload.single('blogImage'), addBlog);

export default blogRouter;