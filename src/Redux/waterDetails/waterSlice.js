import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  month: [],
  today: {
    dailyWaterList: [],
    dailyNorm: 0,
    waterRate: 70,
  },
};

const waterSlice = createSlice({
  name: 'water',
  initialState,
  // extraReducers: builder => {
  //   builder.addCase();
  // },
});

export const waterReducer = waterSlice.reducer;