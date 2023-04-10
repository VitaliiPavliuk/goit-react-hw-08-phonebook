import { createSelector } from '@reduxjs/toolkit';

// ----- User Selectors --------------------------------
export const selectUserStatus = state => state.user.status;
export const selectIsLoggedIn = state => state.user.isLoggedIn;
export const selectToken = state => state.user.token;
export const selectUserEmail = state => state.user.user.email;

// ----- Contacts Selectors --------------------------------
export const selectContactsStatus = state => state.contacts.status;
export const selectContacts = state => state.contacts.contacts;

export const selectFilter = state => state.filter.filter;

export const selectfilteredContacts = createSelector(
  selectContacts,
  selectFilter,
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.trim().toLowerCase())
    );
  }
);
