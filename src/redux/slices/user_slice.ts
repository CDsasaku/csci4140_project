import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../models/user';
import { RootState } from './root_reducers';
import { Notification } from '../../models/notification';

interface UserState {
  user: User | null;
  notifications: Notification[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  notifications: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    // login user
    loginUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginUserSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // logout user
    logoutUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    logoutUserSuccess: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    logoutUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // get user
    getUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUserSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    getUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // update user
    updateUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // get notifications
    getNotificationsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getNotificationsSuccess: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload;
      state.loading = false;
      state.error = null;
    },
    getNotificationsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // update notifications
    updateNotificationsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateNotificationsSuccess: (state, action: PayloadAction<Notification>) => {
      const index = state.notifications.findIndex((notification) => notification.id === action.payload.id);
      if (index !== -1) {
        state.notifications[index] = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    updateNotificationsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

  },
});

export const {
  loginUserStart,
  loginUserSuccess,
  loginUserFailure,
  logoutUserStart,
  logoutUserSuccess,
  logoutUserFailure,
  getUserStart,
  getUserSuccess,
  getUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,

  getNotificationsStart,
  getNotificationsSuccess,
  getNotificationsFailure,
  updateNotificationsStart,
  updateNotificationsSuccess,
  updateNotificationsFailure,
} = userSlice.actions;

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;