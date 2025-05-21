import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { userReducer } from './user/slice.js';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { newsReducer } from './news/slice.js';
import { friendsReducer } from './friends/slice.js';
import { noticesReducer } from './notices/slice.js';
import { filtersReducer } from './filters/slice.js';

const persistUserConfig = {
  key: 'accessToken',
  storage,
  whitelist: ['token', 'isLoggedIn'],
};

const persistNoticesConfig = {
  key: 'favoritesPets',
  storage,
  whitelist: ['favorites'],
};

const persistedUserReducer = persistReducer(persistUserConfig, userReducer);
const persistedNoticesReducer = persistReducer(
  persistNoticesConfig,
  noticesReducer
);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    news: newsReducer,
    friends: friendsReducer,
    notices: persistedNoticesReducer,
    filters: filtersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
