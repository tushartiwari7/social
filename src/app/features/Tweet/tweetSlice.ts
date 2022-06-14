import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { commentUpdate, dislikeUpdate, stateUpdate } from "app/utils";
import dayjs from "dayjs";
import {
  addComment,
  deleteComment,
  deleteTweet,
  dislikeTweet,
  editTweet,
  getAllTweets,
  getComments,
  getFeed,
  getSingleTweet,
  getUserTweets,
  likeTweet,
  postTweet,
} from "./tweetThunk";

import {
  Comment,
  DislikeTweet,
  Tweet,
  TweetSlice,
  TweetTypes,
} from "./tweet.types";

const initialState: TweetSlice = {
  feedTweets: [],
  allTweets: [],
  userTweets: [],
  singleTweet: null,
  singleTweetComments: [],
  commentReplies: [],
  loading: false,
  editing: false,
  commentsLoading: false,
  error: "",
};

const states: TweetTypes[] = ["feedTweets", "allTweets", "userTweets"];

export const tweetSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {
    sort: (
      state: TweetSlice,
      action: PayloadAction<"Trending" | "Latest" | "Oldest">
    ) => {
      switch (action.payload) {
        case "Latest":
          states.forEach((key) => {
            state[key] = state[key].sort((a, b) =>
              dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? -1 : 1
            );
          });
          break;

        case "Oldest":
          states.forEach((key) => {
            state[key] = state[key].sort((a, b) =>
              dayjs(a.createdAt).isBefore(dayjs(b.createdAt)) ? -1 : 1
            );
          });
          break;

        case "Trending":
          states.forEach((key) => {
            state[key] = state[key].sort(
              (a, b) =>
                b.statistics.likeCount +
                b.statistics.commentCount -
                (a.statistics.likeCount + a.statistics.commentCount)
            );
          });
          break;

        default:
          break;
      }
    },
  },
  extraReducers: {
    [postTweet.fulfilled]: (state, action: PayloadAction<Tweet>) => {
      state.feedTweets = [action.payload, ...state.feedTweets];
      state.allTweets = [action.payload, ...state.allTweets];
    },
    [getFeed.fulfilled]: (state, action: PayloadAction<Tweet[]>) => {
      state.feedTweets = action.payload;
      state.loading = false;
    },
    [getFeed.pending]: (state) => {
      state.loading = true;
    },
    [getUserTweets.fulfilled]: (state, action: PayloadAction<Tweet[]>) => {
      state.userTweets = action.payload;
      state.loading = false;
    },
    [getAllTweets.fulfilled]: (state, action: PayloadAction<Tweet[]>) => {
      state.allTweets = action.payload;
      state.loading = false;
    },
    [getAllTweets.pending]: (state) => {
      state.loading = true;
    },
    [getAllTweets.rejected]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    [getUserTweets.rejected]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    [getUserTweets.pending]: (state) => {
      state.loading = true;
    },
    [getSingleTweet.fulfilled]: (state, action: PayloadAction<Tweet>) => {
      state.singleTweet = action.payload;
      state.error = "";
      state.loading = false;
    },
    [getSingleTweet.rejected]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    [getSingleTweet.pending]: (state) => {
      state.loading = true;
    },
    [likeTweet.fulfilled]: (state, action: PayloadAction<Tweet>) => {
      states.forEach((key) => {
        state[key] = state[key].map((tweet) =>
          stateUpdate(tweet, action.payload)
        );
      });
      if (state.singleTweet?._id === action.payload._id)
        state.singleTweet = action.payload;
      state.loading = false;
    },
    [likeTweet.pending]: (state) => {
      state.loading = true;
    },
    [likeTweet.rejected]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    [dislikeTweet.fulfilled]: (state, action: PayloadAction<DislikeTweet>) => {
      states.forEach((key) => {
        state[key] = state[key].map((tweet) =>
          dislikeUpdate(tweet, action.payload)
        );
      });

      if (state.singleTweet?._id === action.payload.post) {
        state.singleTweet.likes = state.singleTweet?.likes.filter(
          (like) => like !== action.payload.user
        );
        state.singleTweet.statistics.likeCount =
          state.singleTweet.statistics.likeCount - 1;
      }
      state.loading = false;
    },
    [dislikeTweet.pending]: (state) => {
      state.loading = true;
    },
    [dislikeTweet.rejected]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    [addComment.fulfilled]: (state, action: PayloadAction<Comment>) => {
      if (action.payload.parentId) state.commentReplies.unshift(action.payload);
      else state.singleTweetComments.unshift(action.payload);
      if (state.singleTweet) state.singleTweet.statistics.commentCount++;
      states.forEach((key) => {
        state[key] = state[key].map((tweet) =>
          commentUpdate(tweet, action.payload)
        );
      });
      state.commentsLoading = false;
    },
    [addComment.pending]: (state) => {
      state.commentsLoading = true;
    },
    [getComments.fulfilled]: (state, action: PayloadAction<Comment[]>) => {
      // Comments which are directly linked to post are stored in the singleTweetComments state
      state.singleTweetComments = action.payload.filter(
        (comment) => !comment.parentId
      );
      // Comments which are replies to other comments are stored in the commentReplies state
      state.commentReplies = action.payload.filter(
        (comment) => comment.parentId
      );
      state.commentsLoading = false;
    },
    [getComments.pending]: (state) => {
      state.commentsLoading = true;
    },
    [deleteTweet.fulfilled]: (state, action: PayloadAction<Tweet>) => {
      states.forEach((key) => {
        state[key] = state[key].filter(
          (tweet) => tweet._id !== action.payload._id
        );
      });
      state.singleTweet = null;
      state.loading = false;
    },
    [deleteTweet.pending]: (state) => {
      state.loading = true;
    },
    [editTweet.fulfilled]: (state, action: PayloadAction<Tweet>) => {
      states.forEach((key) => {
        state[key] = state[key].map((tweet) =>
          tweet._id === action.payload._id ? action.payload : tweet
        );
      });

      if (state.singleTweet?._id === action.payload._id)
        state.singleTweet = action.payload;
      state.editing = false;
    },
    [editTweet.pending]: (state) => {
      state.editing = true;
    },
    [editTweet.rejected]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.editing = false;
    },
    [deleteComment.fulfilled]: (state, action: PayloadAction<Comment>) => {
      states.forEach((key) => {
        state[key] = state[key].map((tweet) =>
          commentUpdate(tweet, action.payload, true)
        );
      });

      state.singleTweetComments = state.singleTweetComments.filter(
        (comment) => comment._id !== action.payload._id
      );
      state.commentReplies = state.commentReplies.filter(
        (comment) => comment._id !== action.payload._id
      );
      if (state.singleTweet)
        state.singleTweet.statistics.commentCount =
          state.singleTweet.statistics.commentCount - 1;

      state.commentsLoading = false;
    },
    [deleteComment.pending]: (state) => {
      state.commentsLoading = true;
    },
    [deleteComment.rejected]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.commentsLoading = false;
    },
  },
});
export const { sort } = tweetSlice.actions;
export default tweetSlice.reducer;
