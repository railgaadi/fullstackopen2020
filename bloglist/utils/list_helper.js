const _ = require("lodash");
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogsArr) => {
  const likesArr = blogsArr.map((blog) => blog.likes);
  const reducer = (sum, item) => {
    return sum + item;
  };
  return likesArr.reduce(reducer, 0);
};

const favBlog = (blogsArr) => {
  const likesArr = blogsArr.map((blog) => blog.likes);
  const favBlogIndex = likesArr.indexOf(Math.max(...likesArr));
  return blogsArr[favBlogIndex];
};

const maxBlogs = (blogsArr) => {
  const counted = _.countBy(blogsArr, "author");
  const author = _.maxBy(_.keys(counted));

  return {
    author,
    blogs: counted[author],
  };
};

const maxLikes = (blogsArr) => {
  let result = {};
  blogsArr.forEach((blog) => {
    result[blog.author]
      ? (result[blog.author] += blog.likes)
      : (result[blog.author] = blog.likes);
  });

  return {
    author: Object.keys(result).reduce((a, b) =>
      result[a] > result[b] ? a : b
    ),
    likes: Math.max(...Object.values(result)),
  };
};

module.exports = { dummy, totalLikes, favBlog, maxBlogs, maxLikes };
