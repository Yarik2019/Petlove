import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectToken } from '../user/selectors.js';

export const petLoveApi = axios.create({
  baseURL: 'https://petlove.b.goit.study/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: status => {
    return status < 400;
  },
});

export const setAuthHeader = token => {
  petLoveApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const useAuthToken = () => {
  const token = useSelector(selectToken);
  if (token) {
    setAuthHeader(token);
  }
};

export default useAuthToken;
