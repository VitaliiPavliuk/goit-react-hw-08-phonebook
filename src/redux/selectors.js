import { createSelector } from '@reduxjs/toolkit';

// export const selectIsLoading = state => state.contacts.isLoading;
// export const selectError = state => state.contacts.error;

// ----- User Selectors --------------------------------
export const selectUserStatus = state => state.user.status;
export const selectIsLoggedIn = state => state.user.isLoggedIn;

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
