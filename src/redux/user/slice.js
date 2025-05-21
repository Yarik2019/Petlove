import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  addPets,
  editUserCurrent,
  getUserCurrentData,
  getUserFullCurrentData,
  loginUser,
  logoutUser,
  registerUser,
} from './operations';

const initialState = {
  isLoggedIn: false,
  userCurrent: null,
  userCurrentFull: null,
  token: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    unauthorized() {
      return initialState;
    },
    removeFavoritesById(state, action) {
      const { id } = action.payload;
      if (state.userCurrentFull) {
        state.userCurrentFull.noticesFavorites =
          state.userCurrentFull.noticesFavorites.filter(
            item => item._id !== id
          );
      }
    },
    removeUserPetById(state, action) {
      if (state.userCurrentFull) {
        state.userCurrentFull.pets = state.userCurrentFull.pets.filter(
          item => item._id !== action.payload
        );
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
      })
      .addCase(getUserCurrentData.fulfilled, (state, action) => {
        state.userCurrent = action.payload;
      })
      .addCase(getUserFullCurrentData.fulfilled, (state, action) => {
        state.userCurrentFull = action.payload;
      })
      .addCase(editUserCurrent.fulfilled, (state, action) => {
        state.userCurrentFull = action.payload;
      })
      .addCase(logoutUser.fulfilled, () => initialState)
      .addCase(addPets.fulfilled, (state, action) => {
        state.userCurrentFull.pets = action.payload.pets;
      })
      .addMatcher(
        isAnyOf(
          registerUser.pending,
          loginUser.pending,
          getUserCurrentData.pending,
          getUserFullCurrentData.pending,
          logoutUser.pending
        ),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          registerUser.fulfilled,
          loginUser.fulfilled,
          getUserCurrentData.fulfilled,
          getUserFullCurrentData.fulfilled,
          logoutUser.fulfilled
        ),
        state => {
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          registerUser.rejected,
          loginUser.rejected,
          getUserCurrentData.rejected,
          getUserFullCurrentData.rejected,
          logoutUser.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { unauthorized, removeFavoritesById, removeUserPetById } =
  authSlice.actions;

export const userReducer = authSlice.reducer;
