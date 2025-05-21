import { createAsyncThunk } from '@reduxjs/toolkit';
import { petLoveApi } from '../service/configApi.js';
import { handleRequest } from '../service/handleRequest.js';

export const getNews = createAsyncThunk(
  'news/getNews',
  async ({ keyword = '', page = 1, limit = 6 }, thunkAPI) => {
    const requestFunction = async () => {
      return petLoveApi.get(
        `/news?page=${page}&limit=${limit}&keyword=${keyword}`
      );
    };
    return handleRequest(requestFunction, thunkAPI);
  }
);
