import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosCall } from "app/utils";
import { loginData, signupData, User } from "./authSlice.types";
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

export const getUser: any = createAsyncThunk(
  "auth/getUser",
  async (userId: string) => {
    try {
      const { data }: any = await axiosCall("/user/" + userId, "get");
      if (data.success) return data.user;
    } catch (error: any) {
      console.error({ error });
      return Promise.reject(error.response.data.message);
    }
  }
);

export const updateUser: any = createAsyncThunk(
  "auth/updateUser",
  async (userData: any, { rejectWithValue }) => {
    try {
      const { data }: any = await axiosCall(
        "/user/update_user_details",
        "post",
        userData
      );
      if (data.success) return data.user;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const followUser: any = createAsyncThunk(
  "auth/followUser",
  async (followeeId: string, { rejectWithValue }) => {
    try {
      const { data }: any = await axiosCall(
        "/user/follow/" + followeeId,
        "put"
      );
      if (data.success) {
        return { user: data.user, followee: data.followee };
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const unfollowUser: any = createAsyncThunk(
  "auth/unfollowUser",
  async (followeeId: string, thunkAPI: any) => {
    try {
      const { data }: any = await axiosCall(
        "/user/unfollow/" + followeeId,
        "patch"
      );
      if (data.success) {
        return { user: data.user, followee: data.followee };
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
