import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserAPI } from 'services/phonebookAPI';

export const requestRegister = createAsyncThunk(
  'user/register',
  async (formData, thunkAPI) => {
    try {
      const response = await UserAPI.register(formData);
      response?.token && localStorage.setItem('token', response.token);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const requestLogin = createAsyncThunk(
  'user/login',
  async (formData, thunkAPI) => {
    try {
      const response = await UserAPI.login(formData);
      response?.token && localStorage.setItem('token', response.token);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const requestLogout = createAsyncThunk(
  'user/logout',
  async (_, thunkAPI) => {
    try {
      const response = await UserAPI.logout();
      localStorage.removeItem('token');

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const requestRefreshUser = createAsyncThunk(
  'user/refresh',
  async (_, thunkAPI) => {
    try {
      const response = await UserAPI.refresh();

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
