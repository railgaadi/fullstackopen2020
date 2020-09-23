const blogRouter = require("express").Router();
const Blog = require("../models/bloglist");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

//GET ALL

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

//POST ONE

blogRouter.post("/", async (request, response, next) => {
  const body = request.body;
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: "missing or invalid token" });
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      likes: body.likes,
      url: body.url,
      user: user._id,
    });

    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id);
    await user.save();
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

//DELETE ONE

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: "missing or invalid token" });
    }
    const requestID = request.params.id;
    const blog = await Blog.findById(requestID);

    if (blog.user.toString() === decodedToken.id.toString()) {
      await Blog.findByIdAndRemove(requestID);
      response.status(204).end();
    } else {
      response
        .status(401)
        .json({ error: "you are unauthorized to delete this post" });
    }
  } catch (error) {
    next(error);
  }
});

//UPDATE ONE

blogRouter.put("/:id", async (request, response, next) => {
  try {
    const id = request.params.id;
    const body = request.body;
    const updatedBlog = {
      likes: body.likes,
      author: body.author,
      title: body.title,
      url: body.url,
    };

    const result = await Blog.findByIdAndUpdate(id, updatedBlog, { new: true });
    response.json(result.toJSON());
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
