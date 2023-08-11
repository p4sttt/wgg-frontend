import axios from 'axios';

import { useToken } from '~/utils/stores';

export const useApi = () => {
  const token = useToken((state) => state.token);
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT,
    headers: {
      Authorization: token,
    },
  });

  return {
    api
  };
};

