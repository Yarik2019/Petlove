import { createSlice } from '@reduxjs/toolkit';
import { getNews } from './operations.js';

const initialState = {
  dataNews: [],
  page: 1,
  perPage: 6,
  totalPages: null,
  isLoading: false,
  isError: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNewsPage: (state, action) => {
      const newPage = action.payload;
      if (newPage >= 1 && newPage <= state.totalPages) {
        state.page = newPage;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getNews.pending, state => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.dataNews = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.isLoading = false;
      })
      .addCase(getNews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export const { setNewsPage } = newsSlice.actions;

export const newsReducer = newsSlice.reducer;
