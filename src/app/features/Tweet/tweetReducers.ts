import { PayloadAction } from "@reduxjs/toolkit";
import { commentUpdate, dislikeUpdate, stateUpdate } from "app/utils";
import dayjs from "dayjs";
import {
  Comment,
  DislikeTweet,
  Tweet,
  TweetSlice,
  TweetTypes,
} from "./tweet.types";

const states: TweetTypes[] = ["feedTweets", "allTweets", "userTweets"];

export const postTweetFulfilled = (
  state: TweetSlice,
  action: PayloadAction<Tweet>
) => {
  state.feedTweets = [action.payload, ...state.feedTweets];
  state.allTweets = [action.payload, ...state.allTweets];
};

export const getFeedFulfilled = (
  state: TweetSlice,
  action: PayloadAction<Tweet[]>
) => {
  state.feedTweets = action.payload;
  state.loading = false;
};

export const getUserTweetsFulfilled = (
  state: TweetSlice,
  action: PayloadAction<Tweet[]>
) => {
  state.userTweets = action.payload;
  state.loading = false;
};

export const getAllTweetsFulfilled = (
  state: TweetSlice,
  action: PayloadAction<Tweet[]>
) => {
  state.allTweets = action.payload;
  state.loading = false;
};

export const getAllTweetsRejected = (
  state: TweetSlice,
  action: PayloadAction<string>
) => {
  state.error = action.payload;
  state.loading = false;
};

export const getUserTweetsRejected = (
  state: TweetSlice,
  action: PayloadAction<string>
) => {
  state.error = action.payload;
  state.loading = false;
};

export const getSingleTweetFulfilled = (
  state: TweetSlice,
  action: PayloadAction<Tweet>
) => {
  state.singleTweet = action.payload;
  state.error = "";
  state.loading = false;
};

export const getSingleTweetRejected = (
  state: TweetSlice,
  action: PayloadAction<string>
) => {
  state.error = action.payload;
  state.loading = false;
};

export const likeTweetFulfilled = (
  state: TweetSlice,
  action: PayloadAction<Tweet>
) => {
  states.forEach((key) => {
    state[key] = state[key].map((tweet) => stateUpdate(tweet, action.payload));
  });
  if (state.singleTweet?._id === action.payload._id)
    state.singleTweet = action.payload;
  state.loading = false;
};

export const likeTweetRejected = (
  state: TweetSlice,
  action: PayloadAction<string>
) => {
  state.error = action.payload;
  state.loading = false;
};

export const dislikeTweetFulfilled = (
  state: TweetSlice,
  action: PayloadAction<DislikeTweet>
) => {
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
};

export const dislikeTweetRejected = (
  state: TweetSlice,
  action: PayloadAction<string>
) => {
  state.error = action.payload;
  state.loading = false;
};

export const addCommentFulfilled = (
  state: TweetSlice,
  action: PayloadAction<Comment>
) => {
  if (action.payload.parentId) state.commentReplies.unshift(action.payload);
  else state.singleTweetComments.unshift(action.payload);
  if (state.singleTweet) state.singleTweet.statistics.commentCount++;
  states.forEach((key) => {
    state[key] = state[key].map((tweet) =>
      commentUpdate(tweet, action.payload)
    );
  });
  state.commentsLoading = false;
};

export const getCommentsFulfilled = (
  state: TweetSlice,
  action: PayloadAction<Comment[]>
) => {
  // Comments which are directly linked to post are stored in the singleTweetComments state
  state.singleTweetComments = action.payload.filter(
    (comment) => !comment.parentId
  );
  // Comments which are replies to other comments are stored in the commentReplies state
  state.commentReplies = action.payload.filter((comment) => comment.parentId);
  state.commentsLoading = false;
};

export const deleteTweetFulfilled = (
  state: TweetSlice,
  action: PayloadAction<Tweet>
) => {
  states.forEach((key) => {
    state[key] = state[key].filter((tweet) => tweet._id !== action.payload._id);
  });
  state.singleTweet = null;
  state.loading = false;
};

export const editTweetFulfilled = (
  state: TweetSlice,
  action: PayloadAction<Tweet>
) => {
  states.forEach((key) => {
    state[key] = state[key].map((tweet) =>
      tweet._id === action.payload._id ? action.payload : tweet
    );
  });

  if (state.singleTweet?._id === action.payload._id)
    state.singleTweet = action.payload;
  state.editing = false;
};

export const editTweetRejected = (
  state: TweetSlice,
  action: PayloadAction<string>
) => {
  state.error = action.payload;
  state.editing = false;
};

export const deleteCommentFulfilled = (
  state: TweetSlice,
  action: PayloadAction<Comment>
) => {
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
};

export const deleteCommentRejected = (
  state: TweetSlice,
  action: PayloadAction<string>
) => {
  state.error = action.payload;
  state.commentsLoading = false;
};

export const sortBy = (
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
};

export const pendingState = (state: TweetSlice) => {
  state.loading = true;
};
