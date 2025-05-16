import { configureStore } from '@reduxjs/toolkit'
import { api } from './api';
import modalReducer from './modalSlice';
import sortReducer from './sortSlice';
import searchReducer from './searchSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    modal: modalReducer,
    sort: sortReducer,
    search: searchReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware);
  }
})
