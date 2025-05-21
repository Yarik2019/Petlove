import { createSlice } from '@reduxjs/toolkit';
import { getFriendsData } from './operations.js';

const initialState = {
  friendsData: [],
  isLoading: false,
  isError: null,
};

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getFriendsData.pending, state => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(getFriendsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.friendsData = action.payload;
      })
      .addCase(getFriendsData.rejected, (state, action) => {
        state.isError = action.payload;
        state.isLoading = false;
      });
  },
});

export const friendsReducer = friendsSlice.reducer;
