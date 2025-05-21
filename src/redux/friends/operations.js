import { createAsyncThunk } from '@reduxjs/toolkit';
import { petLoveApi } from '../service/configApi.js';
import { handleRequest } from '../service/handleRequest.js';

export const getFriendsData = createAsyncThunk(
  'friends/getFriends',
  async (_, thunkAPI) => {
    const requestFunction = async () => {
      return petLoveApi.get('/friends');
    };

    return handleRequest(requestFunction, thunkAPI);
  }
);
