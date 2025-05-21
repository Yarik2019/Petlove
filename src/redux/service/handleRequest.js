import { unauthorized } from '../user/slice.js';

export const handleRequest = async (requestFunction, thunkAPI, data = {}) => {
  try {
    const response = await requestFunction(data);

    return response.data;
  } catch (error) {
    if (error.status === 401) {
      const { dispatch } = thunkAPI;

      dispatch(unauthorized());

      return thunkAPI.rejectWithValue('Token is expired or invalid');
    }
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
};
