import { configureStore } from '@reduxjs/toolkit'
import { api } from './api';
import modalReducer from './modalSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    modal: modalReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware);
  }
})
