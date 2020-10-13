import axios from 'axios';
import { useState } from 'react';

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  const getAll = async () => {
    const response = await axios.get(baseUrl);
    return setResources(response.data);
  };

  const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject);
    return setResources(resources.concat(response.data));
  };

  const service = {
    create,
    getAll,
  };

  return [resources, service];
};
