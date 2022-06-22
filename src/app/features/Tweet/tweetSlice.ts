import { createSlice } from "@reduxjs/toolkit";
import { TweetSlice } from "./tweet.types";
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
  addCommentFulfilled,
  deleteCommentFulfilled,
  deleteCommentRejected,
  deleteTweetFulfilled,
  dislikeTweetFulfilled,
  dislikeTweetRejected,
  editTweetFulfilled,
  editTweetRejected,
  getAllTweetsFulfilled,
  getAllTweetsRejected,
  getCommentsFulfilled,
  getFeedFulfilled,
  getSingleTweetFulfilled,
  getSingleTweetRejected,
  getUserTweetsFulfilled,
  getUserTweetsRejected,
  likeTweetFulfilled,
  likeTweetRejected,
  pendingState,
  postTweetFulfilled,
  sortBy,
} from "./tweetReducers";

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

export const tweetSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {
    sort: sortBy,
  },
  extraReducers: {
    [postTweet.fulfilled.toString()]: postTweetFulfilled,
    [getFeed.fulfilled]: getFeedFulfilled,
    [getFeed.pending]: pendingState,
    [getUserTweets.fulfilled]: getUserTweetsFulfilled,
    [getAllTweets.fulfilled]: getAllTweetsFulfilled,
    [getAllTweets.pending]: pendingState,
    [getAllTweets.rejected]: getAllTweetsRejected,
    [getUserTweets.rejected]: getUserTweetsRejected,
    [getUserTweets.pending]: pendingState,
    [getSingleTweet.fulfilled]: getSingleTweetFulfilled,
    [getSingleTweet.rejected]: getSingleTweetRejected,
    [getSingleTweet.pending]: pendingState,
    [likeTweet.fulfilled]: likeTweetFulfilled,
    [likeTweet.pending]: pendingState,
    [likeTweet.rejected]: likeTweetRejected,
    [dislikeTweet.fulfilled]: dislikeTweetFulfilled,
    [dislikeTweet.pending]: pendingState,
    [dislikeTweet.rejected]: dislikeTweetRejected,
    [addComment.fulfilled.toString()]: addCommentFulfilled,
    [addComment.pending.toString()]: (state) => {
      state.commentsLoading = true;
    },
    [getComments.fulfilled.toString()]: getCommentsFulfilled,
    [getComments.pending.toString()]: (state) => {
      state.commentsLoading = true;
    },
    [deleteTweet.fulfilled]: deleteTweetFulfilled,
    [deleteTweet.pending]: pendingState,
    [editTweet.fulfilled]: editTweetFulfilled,
    [editTweet.pending]: (state) => {
      state.editing = true;
    },
    [editTweet.rejected]: editTweetRejected,
    [deleteComment.fulfilled]: deleteCommentFulfilled,
    [deleteComment.pending]: (state) => {
      state.commentsLoading = true;
    },
    [deleteComment.rejected]: deleteCommentRejected,
  },
});
export const { sort } = tweetSlice.actions;
export default tweetSlice.reducer;
