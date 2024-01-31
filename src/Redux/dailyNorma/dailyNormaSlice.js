// dailyNormaSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getDailyNorma, updateDailyNorma } from './dailyNormaThunk';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const dailyNormaSlice = createSlice({
  name: 'dailyNorma',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getDailyNorma.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDailyNorma.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getDailyNorma.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateDailyNorma.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDailyNorma.fulfilled, state => {
        state.loading = false;
        //
      })
      .addCase(updateDailyNorma.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const dailiNormaReducer = dailyNormaSlice.reducer;
