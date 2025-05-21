// redux/filtersSlice.js
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  getNoticesSearchCategories,
  getNoticesSearchSex,
  getNoticesSearchSpecies,
  getSearchCities,
} from './operations.js';

const initialState = {
  filters: {
    keyword: '',
    category: '',
    species: '',
    sex: '',
    locationId: '',
    byDate: '',
    byPrice: '',
    byPopularity: '',
    page: 1,
    limit: 6,
  },
  categories: [],
  sex: [],
  species: [],
  cities: [],
  isLoading: false,
  isError: null,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter(state, action) {
      const newFilters = action.payload;

      if (newFilters.byPopularity) {
        newFilters.byPrice = '';
      }
      if (newFilters.byPrice) {
        newFilters.byPopularity = '';
      }

      state.filters = {
        ...state.filters,
        ...newFilters,
      };
    },
    resetFilters(state) {
      state.filters = initialState.filters;
    },
    setFiltersPage(state, action) {
      const newPage = action.payload;
      state.filters.page = newPage;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getNoticesSearchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(getNoticesSearchSex.fulfilled, (state, action) => {
        state.sex = action.payload;
      })
      .addCase(getNoticesSearchSpecies.fulfilled, (state, action) => {
        state.species = action.payload;
      })
      .addCase(getSearchCities.fulfilled, (state, action) => {
        state.cities = action.payload;
      })
      .addMatcher(
        isAnyOf(
          getNoticesSearchCategories.pending,
          getNoticesSearchSex.pending,
          getNoticesSearchSpecies.pending,
          getSearchCities.pending
        ),
        state => {
          state.isLoading = true;
          state.isError = null;
        }
      )
      .addMatcher(
        isAnyOf(
          getNoticesSearchCategories.fulfilled,
          getNoticesSearchSex.fulfilled,
          getNoticesSearchSpecies.fulfilled,
          getSearchCities.fulfilled
        ),
        state => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          getNoticesSearchCategories.rejected,
          getNoticesSearchSex.rejected,
          getNoticesSearchSpecies.rejected,
          getSearchCities.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.isError = action.payload;
        }
      );
  },
});

export const { setFilter, resetFilters, setFiltersPage } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
