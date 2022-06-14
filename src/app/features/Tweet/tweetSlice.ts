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
import { DislikeTweet, Tweet, TweetSlice, TweetTypes } from "./tweet.types";

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
    sort: (state: any, action: any) => {
      switch (action.payload) {
        case "Latest":
          states.forEach((key: string) => {
            state[key] = state[key].sort((a: any, b: any) =>
              dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? -1 : 1
            );
          });
          break;

        case "Oldest":
          states.forEach((key: string) => {
            state[key] = state[key].sort((a: any, b: any) =>
              dayjs(a.createdAt).isBefore(dayjs(b.createdAt)) ? -1 : 1
            );
          });
          break;

        case "Trending":
          states.forEach((key: string) => {
            state[key] = state[key].sort(
              (a: any, b: any) =>
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
      console.log(action.payload);

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
    [addComment.fulfilled]: (state: any, action) => {
      console.log(action.payload);
      if (action.payload.parentId) state.commentReplies.unshift(action.payload);
      else state.singleTweetComments.unshift(action.payload);

      state.singleTweet.statistics.commentCount++;
      states.forEach((key: string) => {
        state[key] = state[key].map((tweet: any) =>
          commentUpdate(tweet, action.payload)
        );
      });
      state.commentsLoading = false;
    },
    [addComment.pending]: (state: any) => {
      state.commentsLoading = true;
    },
    [getComments.fulfilled]: (state: any, action) => {
      state.singleTweetComments = action.payload.filter(
        (comment: any) => !comment.parentId
      );
      state.commentReplies = action.payload.filter(
        (comment: any) => comment.parentId
      );
      state.commentsLoading = false;
    },
    [getComments.pending]: (state: any) => {
      state.commentsLoading = true;
    },
    [deleteTweet.fulfilled]: (state: any, action) => {
      states.forEach((key: string) => {
        state[key] = state[key].filter(
          (tweet: any) => tweet._id !== action.payload._id
        );
      });
      state.singleTweet = {};
      state.loading = false;
    },
    [deleteTweet.pending]: (state: any) => {
      state.loading = true;
    },
    [editTweet.fulfilled]: (state: any, action) => {
      states.forEach((key: string) => {
        state[key] = state[key].map((tweet: any) =>
          tweet._id === action.payload._id ? action.payload : tweet
        );
      });

      if (state.singleTweet._id === action.payload._id)
        state.singleTweet = action.payload;
      state.editing = false;
    },
    [editTweet.pending]: (state: any) => {
      state.editing = true;
    },
    [editTweet.rejected]: (state: any, action) => {
      state.error = action.payload;
      state.editing = false;
    },
    [deleteComment.fulfilled]: (state: any, action) => {
      states.forEach((key: string) => {
        state[key] = state[key].map((tweet: any) =>
          commentUpdate(tweet, action.payload, true)
        );
      });

      state.singleTweetComments = state.singleTweetComments.filter(
        (comment: any) => comment._id !== action.payload._id
      );
      state.commentReplies = state.commentReplies.filter(
        (comment: any) => comment._id !== action.payload._id
      );
      state.singleTweet.statistics.commentCount =
        state.singleTweet.statistics.commentCount - 1;
      state.commentsLoading = false;
    },
    [deleteComment.pending]: (state: any) => {
      state.commentsLoading = true;
    },
    [deleteComment.rejected]: (state: any, action) => {
      state.error = action.payload;
      state.commentsLoading = false;
    },
  },
});
export const { sort } = tweetSlice.actions;
export default tweetSlice.reducer;
