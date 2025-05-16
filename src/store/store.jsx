import { configureStore } from '@reduxjs/toolkit'
import { api } from './api';
import modalReducer from './modalSlice';
import sortReducer from './sortSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    modal: modalReducer,
    sort: sortReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware);
  }
})
