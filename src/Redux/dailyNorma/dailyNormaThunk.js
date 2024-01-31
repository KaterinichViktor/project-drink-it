// dailyNormaThunk.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDailyNormaData, updateDailyNormaData } from 'services/api';

export const getDailyNorma = createAsyncThunk(
  'dailyNorma/getDailyNorma',
  async (_, thunkAPI) => {
    try {
      const data = await getDailyNormaData();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateDailyNorma = createAsyncThunk(
  'dailyNorma/updateDailyNorma',
  async (userData, thunkAPI) => {
    try {
      await updateDailyNormaData(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
