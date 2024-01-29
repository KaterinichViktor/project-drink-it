// src/redux/auth/thunk.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import {
    requestLogin,
    requestLogout,
    requestRefreshUser,
    requestSignup,
    setToken,
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    getDailyNormaData,
    updateDailyNormaData,

} from 'services/api';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (body, thunkAPI) => {
    try {
      const response = await requestLogin(body);
      return response;
    } catch (error) {
      toast.error(`Sorry, but such an account doesn't exist.`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signupThunk = createAsyncThunk(
  'auth/signup',
  async (body, thunkAPI) => {
    try {
      const authData = await requestSignup(body);
      return authData;
    } catch (error) {
      toast.error(`Sorry, this account already exists`);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshThunk = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    try {
      setToken(token);
      const authData = await requestRefreshUser();
      return authData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (!token) return false;
      return true;
    },
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await requestLogout();
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

export const getDailyNorma = createAsyncThunk(
    'auth/',
    async (_, thunkAPI) => {
        try {
          const userData = await getDailyNormaData();
          return userData;
        } catch (error) {
          return thunkAPI.rejectWithValue(error.message);
        }
    }
  );
  
  export const updateDailyNorma = createAsyncThunk(
    'auth/',
    async (userData, thunkAPI) => {
        try {
          await updateDailyNormaData(userData);
        //   return userData;
        } catch (error) {
        //   toast.error('Error saving data to the server. Please try again.');
          return thunkAPI.rejectWithValue(error.message);
        }
    }
  );
