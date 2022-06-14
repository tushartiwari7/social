import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deleteTweet,
  dislikeTweet,
  editTweet,
  likeTweet,
} from "./Tweet/tweetThunk";
import { axiosCall } from "app/utils";
import { DislikeTweet, Tweet } from "./Tweet/tweet.types";

export const bookmarkTweet: any = createAsyncThunk(
  "bookmark/add",
  async (tweetId: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosCall("/user/bookmark/" + tweetId, "post");
      if (data.success) return data.bookmark;
    } catch (error: any) {
      return rejectWithValue(error.data.response.message);
    }
  }
);

export const removeBookmark: any = createAsyncThunk(
  "bookmark/remove",
  async (bookmarkId: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosCall(
        "/user/bookmark/" + bookmarkId,
        "delete"
      );
      if (data.success) return data.bookmark;
    } catch (error: any) {
      return rejectWithValue(error.data.response.message);
    }
  }
);

export const getBookmarks: any = createAsyncThunk(
  "user/getBookmark",
  async () => {
    try {
      const { data } = await axiosCall("/user/bookmarks", "get");
      if (data.success) {
        return data.bookmarks;
      }
    } catch (error: any) {
      return Promise.reject(error.data.response.message);
    }
  }
);

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
    [bookmarkTweet.fulfilled]: (state, action: PayloadAction<Bookmark>) => {
      state.unshift(action.payload);
    },
    [removeBookmark.fulfilled]: (state, action: PayloadAction<Bookmark>) => {
      state = state.filter((bookmark) => bookmark._id !== action.payload._id);
      return state;
    },
    [deleteTweet.fulfilled]: (state, action: PayloadAction<Bookmark>) => {
      state = state.filter(
        (bookmark) => bookmark.post._id !== action.payload._id
      );
      return state;
    },
    [getBookmarks.fulfilled]: (state, action: PayloadAction<Bookmark[]>) => {
      state.push(...action.payload);
    },
    [likeTweet.fulfilled]: (state, action: PayloadAction<BookmarkedPost>) => {
      state = state.map((tweet) => {
        if (tweet.post._id === action.payload._id) {
          tweet.post = action.payload;
          return tweet;
        }
        return tweet;
      });
    },
    [dislikeTweet.fulfilled]: (state, action: PayloadAction<DislikeTweet>) => {
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
    [editTweet.fulfilled]: (state, action: PayloadAction<Bookmark>) => {
      state = state.map((tweet) =>
        tweet._id === action.payload._id ? action.payload : tweet
      );
    },
  },
});

export default bookmarkSlice.reducer;
