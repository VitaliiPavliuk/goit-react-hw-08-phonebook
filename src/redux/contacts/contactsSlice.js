import { createSlice } from '@reduxjs/toolkit';
import {
  requestAddContact,
  requestDeleteContact,
  requestUserContacts,
} from './contacts.operations';

const initialState = {
  contacts: [],
  status: 'idle',
  // error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},

  extraReducers: builder =>
    builder

      // ------------ Get user contacts ----------------
      .addCase(requestUserContacts.pending, pendingReducer)
      .addCase(requestUserContacts.fulfilled, (state, { payload }) => {
        state.status = 'resolved';
        state.contacts = payload;
      })
      .addCase(requestUserContacts.rejected, errorReducer)

      // ------------ Add user contact ----------------
      .addCase(requestAddContact.pending, pendingReducer)
      .addCase(requestAddContact.fulfilled, (state, { payload }) => {
        state.status = 'resolved';
        state.contacts = [...state.contacts, payload];
      })
      .addCase(requestAddContact.rejected, errorReducer)

      // ------------ Delete user contact ----------------
      .addCase(requestDeleteContact.pending, pendingReducer)
      .addCase(requestDeleteContact.fulfilled, (state, { payload }) => {
        state.status = 'resolved';
        state.contacts = state.contacts.filter(
          contact => contact.id !== payload.id
        );
      })
      .addCase(requestDeleteContact.rejected, errorReducer),
});

function pendingReducer(state) {
  state.status = 'pending';
  // state.error = null;
}
function errorReducer(state) {
  state.status = 'rejected';
  // state.error = payload;
}

export const contactsReducer = contactsSlice.reducer;
