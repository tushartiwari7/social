import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deleteTweet,
  dislikeTweet,
  editTweet,
  likeTweet,
} from "./Tweet/tweetThunk";
import { axiosCall } from "app/utils";
import { DislikeTweet, Tweet } from "./Tweet/tweet.types";

export const bookmarkTweet = createAsyncThunk<
  Bookmark,
  string,
  { rejectValue: string }
>("bookmark/add", async (tweetId, { rejectWithValue }) => {
  const { data } = await axiosCall("/user/bookmark/" + tweetId, "post");
  if (data.success) return data.bookmark as Bookmark;
  return rejectWithValue(data.message ?? "Failed To Bookmark Tweet");
});

export const removeBookmark = createAsyncThunk<
  Bookmark,
  string,
  { rejectValue: string }
>("bookmark/remove", async (bookmarkId, { rejectWithValue }) => {
  const { data } = await axiosCall("/user/bookmark/" + bookmarkId, "delete");
  if (data.success) return data.bookmark as Bookmark;
  return rejectWithValue(data.message ?? "Failed to remove from Bookmarks.");
});

export const getBookmarks = createAsyncThunk<
  Bookmark[],
  null | undefined,
  { rejectValue: string }
>("user/getBookmark", async (_, { rejectWithValue }) => {
  const { data } = await axiosCall("/user/bookmarks", "get");
  if (data.success) return data.bookmarks as Bookmark[];
  return rejectWithValue(data.message ?? "Failed to load Bookmarks.");
});

type BookmarkedPost = Omit<Tweet, "user"> & {
  user: {
    name: string;
    photo: {
      _id?: string;
      secure_url: string;
    };
    _id: string;
  };
};

export type Bookmark = {
  createdAt: string;
  post: BookmarkedPost;
  user: string;
  _id: string;
};

const initialState: Bookmark[] = [];

export const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {},
  extraReducers: {
    [bookmarkTweet.fulfilled.toString()]: (
      state,
      action: PayloadAction<Bookmark>
    ) => {
      state.unshift(action.payload);
    },
    [removeBookmark.fulfilled.toString()]: (
      state,
      action: PayloadAction<Bookmark>
    ) => {
      state = state.filter((bookmark) => bookmark._id !== action.payload._id);
      return state;
    },
    [deleteTweet.fulfilled.toString()]: (
      state,
      action: PayloadAction<Bookmark>
    ) => {
      state = state.filter(
        (bookmark) => bookmark.post._id !== action.payload._id
      );
      return state;
    },
    [getBookmarks.fulfilled.toString()]: (
      state,
      action: PayloadAction<Bookmark[]>
    ) => {
      state.push(...action.payload);
    },
    [likeTweet.fulfilled.toString()]: (
      state,
      action: PayloadAction<BookmarkedPost>
    ) => {
      state = state.map((tweet) => {
        if (tweet.post._id === action.payload._id) {
          tweet.post = action.payload;
          return tweet;
        }
        return tweet;
      });
    },
    [dislikeTweet.fulfilled.toString()]: (
      state,
      action: PayloadAction<DislikeTweet>
    ) => {
      state = state.map((tweet) => {
        if (tweet.post._id === action.payload.post) {
          tweet.post = {
            ...tweet.post,
            likes: tweet.post.likes.filter(
              (like) => like !== action.payload.user
            ),
            statistics: {
              ...tweet.post.statistics,
              likeCount: tweet.post.statistics.likeCount - 1,
            },
          };
          return tweet;
        }
        return tweet;
      });
    },
    [editTweet.fulfilled.toString()]: (
      state,
      action: PayloadAction<Bookmark>
    ) => {
      state = state.map((tweet) =>
        tweet._id === action.payload._id ? action.payload : tweet
      );
    },
  },
});

export default bookmarkSlice.reducer;
