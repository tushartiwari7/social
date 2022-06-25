import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import { axiosCall } from "app/utils";
import { User } from "./Auth/authSlice.types";
import { signup } from "./Auth/authThunk";

type UsersState = User[];
export const getAllUsers = createAsyncThunk<
  UsersState,
  null | undefined,
  {
    rejectValue: string;
  }
>("users/all", async (_, { rejectWithValue }) => {
  const { data } = await axiosCall("/users", "get");
  if (data.success) return data.users as UsersState;
  return rejectWithValue(data.message ?? "Failed to get users");
});

export const getFollowers = createAsyncThunk<
  UsersState,
  string,
  { rejectValue: string }
>("users/followers", async (userId, { rejectWithValue }) => {
  const { data } = await axiosCall("/user/followers/" + userId, "get");
  if (data.success) return data.followers as UsersState;
  return rejectWithValue(data.message ?? "Failed to get Followers List.");
});

export const getFollowings = createAsyncThunk<
  UsersState,
  string,
  { rejectValue: string }
>("users/followings", async (userId, { rejectWithValue }) => {
  const { data } = await axiosCall("/user/followings/" + userId, "get");
  if (data.success) return data.followings as UsersState;
  return rejectWithValue(data.message ?? "Failed to load Followings List.");
});

export const searchUsers = createAsyncThunk<
  UsersState,
  string,
  { rejectValue: string }
>("users/search", async (search, { rejectWithValue }) => {
  const { data } = await axiosCall("/search_users?name=" + search, "get");
  if (data.success) return data.users as UsersState;
  return rejectWithValue(data.message ?? "Searched User Not Found!");
});

const initialState: UsersState = [];

export const userState = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllUsers.fulfilled.toString()]: (
      state,
      action: PayloadAction<UsersState>
    ) => {
      state.push(...action.payload);
      return state;
    },
    [getAllUsers.rejected.toString()]: (
      state,
      action: PayloadAction<string>
    ) => {
      message.error(action.payload);
    },
    [signup.fulfilled.toString()]: (state, action: PayloadAction<User>) => {
      state.push(action.payload);
      return state;
    },
  },
});

export default userState.reducer;
