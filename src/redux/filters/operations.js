import { createAsyncThunk } from '@reduxjs/toolkit';
import { petLoveApi } from '../service/configApi.js';
import { handleRequest } from '../service/handleRequest.js';

export const getSearchCities = createAsyncThunk(
  'cities/getSearchCities',
  async (keyword = '', thunkAPI) => {
    const requestFunction = async () => {
      const url =
        keyword.trim().length >= 3
          ? `/cities?keyword=${keyword}`
          : '/cities/locations';

      return petLoveApi.get(url);
    };

    return handleRequest(requestFunction, thunkAPI);
  }
);

export const getNoticesSearchCategories = createAsyncThunk(
  'notices/getSearchCategories',
  async (_, thunkAPI) => {
    const requestFunction = async () => {
      return petLoveApi.get('/notices/categories');
    };

    return handleRequest(requestFunction, thunkAPI);
  }
);

export const getNoticesSearchSex = createAsyncThunk(
  'notices/getSearchSex',
  async (_, thunkAPI) => {
    const requestFunction = async () => {
      return petLoveApi.get('/notices/sex');
    };

    return handleRequest(requestFunction, thunkAPI);
  }
);

export const getNoticesSearchSpecies = createAsyncThunk(
  'notices/getSearchSpecies',
  async (_, thunkAPI) => {
    const requestFunction = async () => {
      return petLoveApi.get('/notices/species');
    };

    return handleRequest(requestFunction, thunkAPI);
  }
);
