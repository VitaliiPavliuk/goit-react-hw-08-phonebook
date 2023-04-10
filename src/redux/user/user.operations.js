import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// import { UserAPI } from 'services/phonebookAPI';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const requestRegister = createAsyncThunk(
  'user/register',
  async (formData, thunkAPI) => {
    try {
      const { data } = await axios.post('users/signup', formData);

      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const requestLogin = createAsyncThunk(
  'user/login',
  async (formData, thunkAPI) => {
    try {
      const { data } = await axios.post('users/login', formData);

      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const requestLogout = createAsyncThunk(
  'user/logout',
  async (_, thunkAPI) => {
    try {
      await axios.post('users/logout');

      clearAuthHeader();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const requestRefreshUser = createAsyncThunk(
  'user/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.user.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }
    
    try {
      setAuthHeader(persistedToken);
      
      const { data } = await axios.get('users/current');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
