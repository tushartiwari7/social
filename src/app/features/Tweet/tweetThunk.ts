import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosCall, LikeResponse } from "app/utils";
import { Comment, Tweet } from "./tweet.types";

export const addComment = createAsyncThunk<
  Comment,
  Partial<Omit<Comment, "post"> & { postId: string | undefined }>,
  { rejectValue: string }
>("post/comment", async (comment, { rejectWithValue }) => {
  const { data } = await axiosCall("/post/comment", "POST", comment);
  if (data.success) return data.comment as Comment;
  return rejectWithValue(data.message ?? "Failed to Post Comment.");
});

export const getComments = createAsyncThunk<
  Comment[],
  string,
  { rejectValue: string }
>("post/getComments", async (tweetId, { rejectWithValue }) => {
  const { data } = await axiosCall("/post/comment/" + tweetId, "get");
  if (data.success) return data.comments as Comment[];
  return rejectWithValue(data.message ?? "Failed to load Comments.");
});

export const deleteComment = createAsyncThunk<
  Comment,
  string,
  { rejectValue: string }
>("post/deleteComment", async (commentId, { rejectWithValue }) => {
  const { data } = await axiosCall("/post/comment/" + commentId, "delete");
  if (data.success) return data.comment as Comment;
  return rejectWithValue(
    data.message ?? "Deleting Comment Failed! Try Again Later."
  );
});

export const postTweet = createAsyncThunk<
  Tweet,
  FormData,
  {
    rejectValue: string;
  }
>("tweet/post", async (tweet, { rejectWithValue }) => {
  const { data } = await axiosCall("/tweets", "post", tweet);
  if (data.success) return data.tweet as Tweet;
  return rejectWithValue(data.message ?? "Failed to post Tweet, Try Again.");
});

export const getUserTweets = createAsyncThunk<
  Tweet[],
  string,
  { rejectValue: string }
>("tweet/getUserTweets", async (userId, { rejectWithValue }) => {
  const { data } = await axiosCall("/tweets/userTweets/" + userId, "get");
  if (data.success) return data.tweets as Tweet[];
  return rejectWithValue(data.message ?? "Failed to fetch this user's tweets");
});

export const getFeed = createAsyncThunk<
  Tweet[],
  null | undefined,
  { rejectValue: string }
>("tweet/feed", async (_, { rejectWithValue }) => {
  const { data } = await axiosCall("/tweets/feed", "get");
  if (data.success) return data.tweets as Tweet[];
  return rejectWithValue(
    data.message ?? "Failed to Fetch User Feed, Try Again Later."
  );
});

export const getAllTweets = createAsyncThunk<
  Tweet[],
  null | undefined,
  { rejectValue: string }
>("tweet/getAllTweets", async (_, { rejectWithValue }) => {
  // try {
  const { data } = await axiosCall("/tweets", "get");
  if (data.success) return data.tweets as Tweet[];
  return rejectWithValue(data.message ?? "Failed to Fetch Explore Feed.");
});

export const getSingleTweet = createAsyncThunk<
  Tweet,
  string,
  { rejectValue: string }
>("tweet/single", async (tweetId, { rejectWithValue }) => {
  const { data } = await axiosCall("/tweets/" + tweetId, "get");
  if (data.success) return data.tweet as Tweet;
  return rejectWithValue(
    data.message ?? "Failed to Fetch This Tweet, Try again"
  );
});

export const likeTweet = createAsyncThunk<
  Tweet,
  string,
  { rejectValue: string }
>("tweet/like", async (tweetId, { rejectWithValue }) => {
  const { data } = await axiosCall("/tweet/like/" + tweetId, "post");
  if (data.success && data.like && data.like.post)
    return data.like.post as Tweet;
  return rejectWithValue(data.message ?? "Unable to Like Post");
});

export const dislikeTweet = createAsyncThunk<
  LikeResponse,
  string,
  { rejectValue: string }
>("tweet/dislike", async (tweetId, { rejectWithValue }) => {
  const { data } = await axiosCall("/tweet/like/" + tweetId, "delete");
  if (data.success) return data.like as LikeResponse;
  return rejectWithValue(
    data.message ?? "Dislike Tweet failed, please try again later."
  );
});

export const deleteTweet = createAsyncThunk<
  Tweet,
  string,
  { rejectValue: string }
>("tweet/delete", async (tweetId, { rejectWithValue }) => {
  const { data } = await axiosCall("/tweets/" + tweetId, "delete");
  if (data.success) return data.tweet as Tweet;
  return rejectWithValue(
    data.message ?? "Deleting Tweet Failed, please try again later"
  );
});

type editTweetType = {
  tweetId: string;
  formData?: FormData;
};

export const editTweet = createAsyncThunk<
  Tweet,
  editTweetType,
  { rejectValue: string }
>("tweet/edit", async ({ tweetId, formData }, { rejectWithValue }) => {
  const { data } = await axiosCall("/tweets/" + tweetId, "put", formData);
  if (data.success) return data.tweet as Tweet;
  return rejectWithValue(
    data.message ?? "Failed to Update Tweet, please try again"
  );
});
