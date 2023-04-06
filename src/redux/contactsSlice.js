import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, deleteContact, addContact } from './operations';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};
const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,

  extraReducers: builder =>
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)

      // add

      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items.push(payload);
      })
      .addCase(addContact.rejected, handleRejected)

      // delete

      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const index = state.items.findIndex(item => item.id === payload.id);
        state.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, handleRejected),
});

export const contactsReducer = contactsSlice.reducer;
