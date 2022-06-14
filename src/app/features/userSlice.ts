import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosCall } from "app/utils";
import { User } from "./Auth/authSlice.types";
import { signup } from "./Auth/authThunk";

type UsersState = User[];
export const getAllUsers: any = createAsyncThunk("users/all", async () => {
  try {
    const response = await axiosCall("/users", "get");
    if (response.data.success) return response.data.users as UsersState;
    if (
      response.status < 200 ||
      response.status >= 300 ||
      !response.data.success
    )
      return Promise.reject(response.data.message || "Failed to get users");
  } catch (error: any) {
    return Promise.reject(error.response.data.message || "Failed to get users");
  }
});

export const getFollowers: any = createAsyncThunk(
  "users/followers",
  async (userId: string) => {
    try {
      const { data }: any = await axiosCall("/user/followers/" + userId, "get");
      if (data.success) return data.followers;
    } catch (err: any) {
      return Promise.reject(err.response.data.message);
    }
  }
);

export const getFollowings: any = createAsyncThunk(
  "users/followings",
  async (userId: string) => {
    try {
      const { data }: any = await axiosCall(
        "/user/followings/" + userId,
        "get"
      );
      if (data.success) return data.followings;
    } catch (err: any) {
      return Promise.reject(err.response.data.message);
    }
  }
);

export const searchUsers: any = createAsyncThunk(
  "users/search",
  async (search: string) => {
    try {
      const { data }: any = await axiosCall(
        "/search_users?name=" + search,
        "get"
      );
      if (data.success) return data.users;
    } catch (err: any) {
      return Promise.reject(err.response.data.message);
    }
  }
);

const initialState: UsersState = [];

export const userState = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllUsers.fulfilled]: (state, action: PayloadAction<UsersState>) => {
      state = action.payload;
      return state;
    },
    [signup.fulfilled]: (state, action: PayloadAction<User>) => {
      state.push(action.payload);
      return state;
    },
  },
});

export default userState.reducer;
