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
    setSort: (state, action) => {
      state.isSorted = action.payload;
    },
  },
});

export const { toggleSort, setSort } = sortSlice.actions;

export const selectIsSorted = (state) => state.sort.isSorted;

export default sortSlice.reducer; 