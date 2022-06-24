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
    [getFeed.fulfilled.toString()]: getFeedFulfilled,
    [getFeed.pending.toString()]: pendingState,
    [getAllTweets.fulfilled.toString()]: getAllTweetsFulfilled,
    [getAllTweets.pending.toString()]: pendingState,
    [getAllTweets.rejected.toString()]: getAllTweetsRejected,
    [getUserTweets.fulfilled.toString()]: getUserTweetsFulfilled,
    [getUserTweets.rejected.toString()]: getUserTweetsRejected,
    [getUserTweets.pending.toString()]: pendingState,
    [getSingleTweet.fulfilled.toString()]: getSingleTweetFulfilled,
    [getSingleTweet.rejected.toString()]: getSingleTweetRejected,
    [getSingleTweet.pending.toString()]: pendingState,
    [likeTweet.fulfilled.toString()]: likeTweetFulfilled,
    [likeTweet.pending.toString()]: pendingState,
    [likeTweet.rejected.toString()]: likeTweetRejected,
    [dislikeTweet.fulfilled.toString()]: dislikeTweetFulfilled,
    [dislikeTweet.pending.toString()]: pendingState,
    [dislikeTweet.rejected.toString()]: dislikeTweetRejected,
    [addComment.fulfilled.toString()]: addCommentFulfilled,
    [addComment.pending.toString()]: (state) => {
      state.commentsLoading = true;
    },
    [getComments.fulfilled.toString()]: getCommentsFulfilled,
    [getComments.pending.toString()]: (state) => {
      state.commentsLoading = true;
    },
    [deleteTweet.fulfilled.toString()]: deleteTweetFulfilled,
    [deleteTweet.pending.toString()]: pendingState,
    [editTweet.fulfilled.toString()]: editTweetFulfilled,
    [editTweet.pending.toString()]: (state) => {
      state.editing = true;
    },
    [editTweet.rejected.toString()]: editTweetRejected,
    [deleteComment.fulfilled.toString()]: deleteCommentFulfilled,
    [deleteComment.pending.toString()]: (state) => {
      state.commentsLoading = true;
    },
    [deleteComment.rejected.toString()]: deleteCommentRejected,
  },
});
export const { sort } = tweetSlice.actions;
export default tweetSlice.reducer;
