import { configureStore } from '@reduxjs/toolkit';

import { userReducer } from './user/userSlice';
import { contactsReducer } from './contacts/contactsSlice';
import { filterReducer } from './filterSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    contacts: contactsReducer,
    filter: filterReducer,
  },
});
