import { configureStore } from '@reduxjs/toolkit';

import { userReducer } from './user/userSlice';
import { contactsReducer } from './contacts/contactsSlice';
import { filterReducer } from './filterSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const userConfig = {
  key: 'user',
  storage,

  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    user: persistReducer(userConfig, userReducer),
    contacts: contactsReducer,
    filter: filterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// import { getDefaultMiddleware } from '@reduxjs/toolkit';
