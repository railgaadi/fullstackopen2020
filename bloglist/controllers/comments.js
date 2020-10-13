const commentRouter = require('express').Router();
const Blog = require('../models/bloglist');
const Comment = require('../models/comments');
const jwt = require('jsonwebtoken');

commentRouter.post('/:id/comments', async (request, response, next) => {
  try {
    const body = request.body;
    const id = request.params.id;
    const blog = await Blog.findById(id);
    const comment = new Comment({ content: body.content, blog: blog._id });
    const result = await comment.save();
    blog.comments = blog.comments.concat(result._id);
    await blog.save();
    response.status(201).json(result.toJSON());
  } catch (error) {
    next(error);
  }
});

module.exports = commentRouter;
