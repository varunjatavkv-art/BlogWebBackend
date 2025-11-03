import Blog from "../models/Blogs.js";

export const addBlog =  async (req,res) => {
    try {
        const {filename} = req.file;
        const { title, description, status, created_at, edited_at, created_by, edited_by} = req.body;
        const blog = await Blog({
            imageUrl: filename,
            title,
            description,
            status,
            created_at,
            edited_at,
            created_by,
            edited_by
        });
        await blog.save();
        return res.status(201).json({message:"New Blog has been success fully created !!"})
    } catch (error) {
        return res.status(404).json({error});
    }
};