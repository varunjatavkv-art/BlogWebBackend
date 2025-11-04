import Blog from "../models/Blogs.js";

export const addBlog = async (req, res) => {
  try {
    const { filename } = req.file;
    const {
      title,
      description,
      status,
      created_at,
      edited_at,
      created_by,
      edited_by,
    } = req.body;
    const blog = await Blog({
      imageUrl: filename,
      title,
      description,
      status,
      created_at,
      edited_at,
      created_by,
      edited_by,
    });
    await blog.save();
    return res.status(201).json({
      message: "New Blog has been success fully created !!",
      blog: blog,
    });
  } catch (error) {
    return res.status(404).json({ error });
  }
};

export const getBlogs = async (req, res) => {
    // console.log(req);
    
  try {
    const { page = 1, limit = 10, searchQuery, status } = req.query;

    const skip = (page - 1) * limit;

    const totalBlogs = await Blog.countDocuments();

    let filter = {};

    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, "i");

      filter = {
        $or: [{ title: searchRegex }],
      };
    }
    if (status == "-1") {
      return res.status(400).json({ error: "Select a valid status" });
    }
    if (status) {
      filter["status"] = status;
    }

    const blog = await Blog.find(filter).skip(skip).limit(limit);

    return res.status(200).json({
      blog: blog,
      totalBlogs: totalBlogs,
    });
  } catch (error) {
    console.log(error);
    
    return res.status(404).json({ error });
  }
};

export const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const singleBlog = await Blog.findOne({ _id: id });
    res.status(200).json({
      message: "fetched single blog successfully",
      singleBlog: singleBlog,
    });
  } catch (error) {
    return res.status(404).json({ error });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.deleteOne({ _id: id });
    if (deletedBlog.deleteCount == 0) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json({
      message: "Blog Deleted successfully",
      deletedBlog: deletedBlog,
    });
  } catch (error) {
    return res.status(404).json({ error });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const { filename } = req.file;
    const {
      title,
      description,
      status,
      created_at,
      edited_at,
      created_by,
      edited_by,
    } = req.body;

    const updatedBlog = await Blog.updateOne(
      { _id: id },
      {
        $set: {
          imageUrl: filename,
          title,
          description,
          status,
          created_at,
          edited_at,
          created_by,
          edited_by,
        },
      },
      { upsert: true }
    );
    if (updatedBlog.matchedCount == 0) {
      return res.status(404).json({ error: "Blog not found for updations" });
    }
    res.status(200).json({
      message: "Blog Updated successfully",
      updatedBlog: updatedBlog,
    });
  } catch (error) {
    return res.status(404).json({ error });
  }
};
