import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, FollowAction, User } from "./authSlice.types";
import {
  followUser,
  getAuthUser,
  getUser,
  login,
  signup,
  unfollowUser,
  updateUser,
} from "./thunkApiCalls/authThunk";

const initialState: AuthState = {
  user: {},
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
    [login.fulfilled]: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.loginStatus = "succeeded";
    },
    [login.rejected]: (state, action: PayloadAction<User>) => {
      state.user = {};
      state.isLoggedIn = false;
      state.loginStatus = "failed";
      return action.payload;
    },
    [getAuthUser.fulfilled]: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.loginStatus = "succeeded";
    },
    [getAuthUser.rejected]: (state) => {
      state.user = {};
      state.isLoggedIn = false;
      state.loginStatus = "failed";
    },
    [signup.fulfilled]: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.loginStatus = "succeeded";
    },
    [signup.rejected]: (state) => {
      state.user = {};
      state.isLoggedIn = false;
      state.loginStatus = "failed";
    },
    [updateUser.fulfilled]: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loginStatus = "succeeded";
    },
    [updateUser.rejected]: (state) => (state.error = "Update User failed"),
    [followUser.fulfilled]: (state, action: PayloadAction<FollowAction>) => {
      state.user = action.payload.user;
    },
    [followUser.rejected]: (state) => (state.error = "Failed to follow user"),
    [unfollowUser.fulfilled]: (state, action: PayloadAction<FollowAction>) => {
      state.user = action.payload.user;
    },
    [unfollowUser.rejected]: (state) =>
      (state.error = "Failed to unfollow user"),
    [getUser.fulfilled]: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
  },
});

export const { logout } = authState.actions;
export default authState.reducer; // exports extraReducers{}
