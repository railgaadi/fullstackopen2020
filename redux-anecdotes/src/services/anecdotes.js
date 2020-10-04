import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createAnecdote = async (content) => {
  const obj = { content, votes: 0 };
  const response = await axios.post(baseUrl, obj);
  return response.data;
};

const upvote = async (id) => {
  const returnedObj = await axios.get(`${baseUrl}/${id}`);
  const response = await axios.put(`${baseUrl}/${id}`, {
    ...returnedObj.data,
    votes: returnedObj.data.votes + 1,
  });
  return response.data;
};

export default { getAll, createAnecdote, upvote };
