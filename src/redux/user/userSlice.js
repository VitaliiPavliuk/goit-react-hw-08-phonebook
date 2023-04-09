import { createSlice } from '@reduxjs/toolkit';
import {
  requestLogin,
  requestLogout,
  requestRefreshUser,
  requestRegister,
} from './user.operations';

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  status: 'idle',
  // error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},

  extraReducers: builder =>
    builder

      // ------------ Register user ----------------
      .addCase(requestRegister.pending, pendingReducer)
      .addCase(requestRegister.fulfilled, (state, { payload }) => {
        state.status = 'resolved';
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addCase(requestRegister.rejected, errorReducer)

      // ------------ Login user ----------------
      .addCase(requestLogin.pending, pendingReducer)
      .addCase(requestLogin.fulfilled, (state, { payload }) => {
        state.status = 'resolved';
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addCase(requestLogin.rejected, errorReducer)

      // ------------ User logOut ----------------
      .addCase(requestLogout.pending, pendingReducer)
      .addCase(requestLogout.fulfilled, state => {
        state.status = 'resolved';
        state.user = {
          name: null,
          email: null,
        };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(requestLogout.rejected, errorReducer)

      // ------------ User refresh ----------------
      .addCase(requestRefreshUser.pending, pendingReducer)
      .addCase(requestRefreshUser.fulfilled, (state, { payload }) => {
        state.status = 'resolved';
        state.user = {
          name: payload.name,
          email: payload.email,
        };
        state.isLoggedIn = true;
      })
      .addCase(requestRefreshUser.rejected, errorReducer),
});

function pendingReducer(state) {
  state.status = 'pending';
  // state.error = null;
}
function errorReducer(state) {
  state.status = 'rejected';
  // state.error = payload;
}

export const userReducer = userSlice.reducer;
