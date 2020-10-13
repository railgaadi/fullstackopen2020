import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const postBlog = async contentObj => {
  const config = { headers: { Authorization: token } };
  const result = await axios.post(baseUrl, contentObj, config);
  return result.data;
};

const addLike = async blogObj => {
  const result = await axios.put(`${baseUrl}/${blogObj.id}`, {
    ...blogObj,
    likes: blogObj.likes + 1,
  });

  return result.data;
};

const deleteBlog = async id => {
  const config = { headers: { Authorization: token } };
  const result = await axios.delete(`${baseUrl}/${id}`, config);
  return result.data;
};

const postComment = async (id, content) => {
  const CommentObj = { content };
  const result = await axios.post(`${baseUrl}/${id}/comments`, CommentObj);
  return result.data;
};

export default { getAll, setToken, postBlog, addLike, deleteBlog, postComment };
