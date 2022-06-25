import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosCall } from "app/utils";
import { FollowAction, loginData, signupData, User } from "./authSlice.types";
export const login = createAsyncThunk<
  User,
  loginData,
  {
    rejectValue: string;
  }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  const { data } = await axiosCall("/login", "post", { email, password });
  if (data.success && data.token) {
    localStorage.setItem("token", data.token);
    return data.user as User;
  }
  return rejectWithValue(data.message ?? "Login Failed, Please Try Again");
});

export const signup = createAsyncThunk<
  User,
  signupData,
  { rejectValue: string }
>("auth/signup", async (userData, { rejectWithValue }) => {
  const { data } = await axiosCall("/signup", "post", userData);
  if (data.success && data.token) {
    localStorage.setItem("token", data.token);
    return data.user as User;
  }
  return rejectWithValue(data.message ?? "Signup Failed, Please Try Again.");
});

export const getAuthUser = createAsyncThunk<
  User,
  null | undefined,
  {
    rejectValue: string;
  }
>("auth/user", async (_, { rejectWithValue }) => {
  const { data } = await axiosCall("/user/profile", "get");
  if (data.success) return data.user as User;

  return rejectWithValue(data.message ?? "Failed to Load User Profile");
});

export const getUser = createAsyncThunk<
  User,
  string,
  {
    rejectValue: string;
  }
>("auth/getUser", async (userId, { rejectWithValue }) => {
  const { data } = await axiosCall("/user/" + userId, "get");
  if (data.success) return data.user as User;
  return rejectWithValue(data.message ?? "Failed to load User Details.");
});

export const updateUser = createAsyncThunk<
  User,
  FormData,
  {
    rejectValue: string;
  }
>("auth/updateUser", async (userData, { rejectWithValue }) => {
  const { data } = await axiosCall(
    "/user/update_user_details",
    "post",
    userData
  );
  if (data.success) return data.user as User;
  return rejectWithValue(data.message ?? "Failed To Update User");
});

export const followUser = createAsyncThunk<
  FollowAction,
  string,
  {
    rejectValue: string;
  }
>("auth/followUser", async (followeeId, { rejectWithValue }) => {
  const { data } = await axiosCall("/user/follow/" + followeeId, "put");
  if (data.success) {
    return { user: data.user, followee: data.followee } as FollowAction;
  }
  return rejectWithValue(data.message ?? "Unable to Follow User!");
});

export const unfollowUser = createAsyncThunk<
  FollowAction,
  string,
  { rejectValue: string }
>("auth/unfollowUser", async (followeeId, { rejectWithValue }) => {
  const { data } = await axiosCall("/user/unfollow/" + followeeId, "patch");
  if (data.success) {
    return { user: data.user, followee: data.followee } as FollowAction;
  }
  return rejectWithValue(data.message ?? "Unable to UnFollow User!");
});
