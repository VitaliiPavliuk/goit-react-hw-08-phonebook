import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// import { ContactsAPI } from 'services/phonebookAPI';

export const requestUserContacts = createAsyncThunk(
  'contacts/getAll',
  async (_, thunkAPI) => {
    try {    
      const { data } = await axios.get('contacts');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const requestAddContact = createAsyncThunk(
  'contacts/addContact',
  async (formData, thunkAPI) => {
    try {    
      const { data } = await axios.post('contacts', formData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const requestDeleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {    
      const { data } = await axios.delete(`contacts/${contactId}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
