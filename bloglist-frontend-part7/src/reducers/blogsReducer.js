import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS': {
      return action.blogs;
    }
    case 'NEW_BLOG': {
      return state.concat(action.data);
    }

    case 'DELETE_BLOG': {
      const id = action.data;
      const deleteIndex = state.findIndex(blog => blog.id === id);
      return state.filter((item, index) => index !== deleteIndex);
    }

    case 'ADD_LIKE': {
      const id = action.data.id;
      const blogToLike = state.find(blog => blog.id === id);
      const updatedBlog = { ...blogToLike, likes: blogToLike.likes + 1 };
      return state.map(blog => (blog.id === id ? updatedBlog : blog));
    }

    case 'ADD_COMMENT': {
      const id = action.data.id;
      const commentObj = action.data.comment;
      const blogToComment = state.find(blog => blog.id === id);
      const updatedBlog = {
        ...blogToComment,
        comments: blogToComment.comments.concat(commentObj),
      };
      return state.map(blog => (blog.id === id ? updatedBlog : blog));
    }

    default:
      return state;
  }
};

export const initBlogs = () => {
  return async dispatch => {
    try {
      const blogs = await blogService.getAll();
      dispatch({
        type: 'INIT_BLOGS',
        blogs,
      });
    } catch (error) {
      setNotification(error.message);
    }
  };
};

export const createBlog = blogObj => {
  return async dispatch => {
    try {
      const newBlog = await blogService.postBlog(blogObj);
      const user = JSON.parse(localStorage.getItem('loggedInBlogUser'));
      newBlog.user = user;
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog,
      });
      dispatch(
        setNotification(`New blog ${blogObj.title} added, by ${blogObj.author}`)
      );
    } catch (error) {
      dispatch(setNotification('Something went wrong'));
    }
  };
};

export const deleteOne = blogObj => {
  return async dispatch => {
    try {
      await blogService.deleteBlog(blogObj.id);
      dispatch(setNotification(`Deleted blog ${blogObj.title}`));
      dispatch({
        type: 'DELETE_BLOG',
        data: blogObj.id,
      });
    } catch (error) {
      dispatch(setNotification('Something went wrong'));
    }
  };
};

export const addLike = blogObj => {
  return async dispatch => {
    try {
      const likedBlog = await blogService.addLike(blogObj);
      dispatch({
        type: 'ADD_LIKE',
        data: { id: likedBlog.id },
      });
    } catch (error) {
      dispatch(setNotification('Something went wrong'));
    }
  };
};

export const addComment = (id, content) => {
  return async dispatch => {
    try {
      const commentBlog = await blogService.postComment(id, content);
      dispatch({
        type: 'ADD_COMMENT',
        data: {
          id: commentBlog.blog,
          comment: { content: commentBlog.content, id: commentBlog.id },
        },
      });
    } catch (error) {
      dispatch(setNotification('Something went wrong'));
    }
  };
};

export default reducer;
