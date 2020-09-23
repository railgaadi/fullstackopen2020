import axios from "axios";
const baseURL = "/api/persons";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const create = (personObj) => {
  const request = axios.post(baseURL, personObj);
  return request.then((response) => response.data);
};

const deleteOne = (id) => {
  return axios.delete(`${baseURL}/${id}`);
};

const update = (id, updatedPerson) => {
  const request = axios.put(`${baseURL}/${id}`, updatedPerson);
  return request.then((response) => response.data);
};

export default { getAll, create, deleteOne, update };
