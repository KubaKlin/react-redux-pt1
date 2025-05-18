import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSorted: false,
};

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    toggleSort: (state) => {
      state.isSorted = !state.isSorted;
    },
  },
});

export const { toggleSort } = sortSlice.actions;

export const selectIsSorted = (state) => state.sort.isSorted;

export default sortSlice.reducer; 