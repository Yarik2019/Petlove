import { createAsyncThunk } from '@reduxjs/toolkit';
import { petLoveApi, setAuthHeader } from '../service/configApi.js';
import { handleRequest } from '../service/handleRequest.js';

export const registerUser = createAsyncThunk(
  'user/register',
  async (credentials, thunkAPI) => {
    const requestFunction = async data => {
      return petLoveApi.post('users/signup', data);
    };
    const result = await handleRequest(requestFunction, thunkAPI, credentials);

    if (result?.token) setAuthHeader(result.token);

    return result;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials, thunkAPI) => {
    const requestFunction = async data => {
      return petLoveApi.post('users/signin', data);
    };

    const result = await handleRequest(requestFunction, thunkAPI, credentials);

    if (result?.token) setAuthHeader(result.token);

    return result;
  }
);

export const getUserCurrentData = createAsyncThunk(
  'user/current',
  async (_, thunkAPI) => {
    return handleRequest(() => petLoveApi.get('users/current'), thunkAPI);
  }
);

export const getUserFullCurrentData = createAsyncThunk(
  'user/full-current',
  async (_, thunkAPI) => {
    return handleRequest(() => petLoveApi.get('users/current/full'), thunkAPI);
  }
);

export const editUserCurrent = createAsyncThunk(
  'user/current-edit',
  async (credentials, thunkAPI) => {
    const requestFunction = async data => {
      return petLoveApi.patch('users/current/edit', data);
    };

    return handleRequest(requestFunction, thunkAPI, credentials);
  }
);

export const addPets = createAsyncThunk(
  'user/pets-add',
  async (credentials, thunkAPI) => {
    const requestFunction = async data => {
      return petLoveApi.post('users/current/pets/add', data);
    };

    return handleRequest(requestFunction, thunkAPI, credentials);
  }
);

export const removePets = createAsyncThunk(
  'user/pets-remove',
  async (id, thunkAPI) => {
    return handleRequest(
      () => petLoveApi.delete(`users/current/pets/remove/${id}`),
      thunkAPI
    );
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, thunkAPI) => {
    return handleRequest(() => petLoveApi.post('users/signout'), thunkAPI);
  }
);
