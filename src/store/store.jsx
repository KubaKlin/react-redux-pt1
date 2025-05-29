import { configureStore } from '@reduxjs/toolkit'
import { api } from './api';
import modalReducer from './modalSlice';
import sortReducer from './sortSlice';
import searchReducer from './searchSlice';
import favoritesReducer from './favoritesSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    modal: modalReducer,
    sort: sortReducer,
    search: searchReducer,
    favorites: favoritesReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware);
  }
})
