import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  addNoticeFavorite,
  getAllNoticesData,
  getNoticeById,
  removeNoticeFavorite,
} from './operations.js';
import { getUserFullCurrentData } from '../user/operations.js';

const initialState = {
  notiesData: [],
  favorites: [],
  noticeById: null,
  totalPages: null,
  isLoading: false,
  isError: null,
};

const noticesSlice = createSlice({
  name: 'notices',
  initialState,
  reducers: {
    removeNoticesById: state => {
      state.noticeById = null;
    },
    logoutCleanStateNotices: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(getAllNoticesData.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllNoticesData.fulfilled, (state, action) => {
        state.notiesData = action.payload.results;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getNoticeById.fulfilled, (state, action) => {
        state.noticeById = action.payload;
      })
      .addCase(addNoticeFavorite.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(removeNoticeFavorite.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(getUserFullCurrentData.fulfilled, (state, action) => {
        state.favorites = action.payload.noticesFavorites.map(fav => fav._id);
      })
      .addMatcher(
        isAnyOf(
          getAllNoticesData.pending,
          addNoticeFavorite.pending,
          removeNoticeFavorite.pending,
          getNoticeById.pending
        ),
        state => {
          state.isError = null;
        }
      )
      .addMatcher(
        isAnyOf(
          getAllNoticesData.fulfilled,
          addNoticeFavorite.fulfilled,
          removeNoticeFavorite.fulfilled,
          getNoticeById.fulfilled
        ),
        state => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          getAllNoticesData.rejected,
          addNoticeFavorite.rejected,
          removeNoticeFavorite.rejected,
          getNoticeById.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.isError = action.payload;
        }
      );
  },
});

export const { removeNoticesById, logoutCleanStateNotices } =
  noticesSlice.actions;

export const noticesReducer = noticesSlice.reducer;
