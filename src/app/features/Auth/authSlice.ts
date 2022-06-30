import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, AuthState, FollowAction } from "./authSlice.types";
import {
  followUser,
  getAuthUser,
  getUser,
  login,
  signup,
  unfollowUser,
  updateUser,
} from "./authThunk";

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  loginStatus: "idle",
  error: "",
};

export const authState = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state: AuthState) => {
      localStorage.removeItem("token");
      state = initialState;
      return state;
    },
  },
  extraReducers: {
    [login.fulfilled.toString()]: (
      state: AuthState,
      action: PayloadAction<User>
    ) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.loginStatus = "succeeded";
    },
    [login.rejected.toString()]: (
      state: AuthState,
      action: PayloadAction<User>
    ) => {
      state.user = null;
      state.isLoggedIn = false;
      state.loginStatus = "failed";
      return action.payload;
    },
    [getAuthUser.fulfilled.toString()]: (
      state,
      action: PayloadAction<User>
    ) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.loginStatus = "succeeded";
    },
    [getAuthUser.rejected.toString()]: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.loginStatus = "failed";
    },
    [signup.fulfilled.toString()]: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.loginStatus = "succeeded";
    },
    [signup.rejected.toString()]: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.loginStatus = "failed";
    },
    [updateUser.fulfilled.toString()]: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loginStatus = "succeeded";
    },
    [updateUser.rejected.toString()]: (state) =>
      (state.error = "Update User failed"),
    [followUser.fulfilled.toString()]: (
      state,
      action: PayloadAction<FollowAction>
    ) => {
      state.user = action.payload.user;
    },
    [followUser.rejected.toString()]: (state) =>
      (state.error = "Failed to follow user"),
    [unfollowUser.fulfilled.toString()]: (
      state,
      action: PayloadAction<FollowAction>
    ) => {
      state.user = action.payload.user;
    },
    [unfollowUser.rejected.toString()]: (state) =>
      (state.error = "Failed to unfollow user"),
    [getUser.fulfilled.toString()]: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
  },
});

export const { logout } = authState.actions;
export default authState.reducer; // exports extraReducers{}
