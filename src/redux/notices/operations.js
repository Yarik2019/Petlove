import { createAsyncThunk } from '@reduxjs/toolkit';
import { petLoveApi } from '../service/configApi.js';
import { handleRequest } from '../service/handleRequest.js';

export const getAllNoticesData = createAsyncThunk(
  'noties/getAll',
  async (params, thunkAPI) => {
    const {
      keyword = '',
      category,
      locationId,
      species,
      byDate,
      byPrice,
      byPopularity,
      page = 1,
      limit = 6,
      sex,
    } = params;

    const requestFunction = async () => {
      const searchParams = new URLSearchParams();
      if (keyword) searchParams.append('keyword', keyword);
      if (category) searchParams.append('category', category);
      if (species) searchParams.append('species', species);
      if (locationId) searchParams.append('locationId', locationId);
      if (byDate) searchParams.append('byDate', byDate);
      if (byPrice) searchParams.append('byPrice', byPrice);
      if (byPopularity) searchParams.append('byPopularity', byPopularity);
      if (sex) searchParams.append('sex', sex);
      searchParams.append('page', page);
      searchParams.append('limit', limit);

      return petLoveApi.get(`/notices?${searchParams.toString()}`);
    };
    return handleRequest(requestFunction, thunkAPI);
  }
);

export const getNoticeById = createAsyncThunk(
  'noties/getById',
  async (id, thunkAPI) => {
    const requestFunction = async () => {
      return petLoveApi.get(`/notices/${id}`);
    };
    return handleRequest(requestFunction, thunkAPI);
  }
);

export const addNoticeFavorite = createAsyncThunk(
  'noties/addFavorite',
  async (id, thunkAPI) => {
    const requestFunction = async () => {
      return petLoveApi.post(`/notices/favorites/add/${id}`);
    };
    return handleRequest(requestFunction, thunkAPI);
  }
);

export const removeNoticeFavorite = createAsyncThunk(
  'noties/removeFavorite',
  async (id, thunkAPI) => {
    const requestFunction = async () => {
      return petLoveApi.delete(`/notices/favorites/remove/${id}`);
    };
    return handleRequest(requestFunction, thunkAPI);
  }
);
