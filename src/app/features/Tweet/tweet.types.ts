import { User } from "../Auth/authSlice.types";

type Tweet = {
  createdAt: string;
  description: string;
  likes: string[];
  statistics: {
    viewCount: number;
    likeCount: number;
    favoriteCount: number;
    commentCount: number;
  };
  tags: string[];
  updatedAt?: string;
  user: User;
  _id: string;
};

type Comment = {
  body: string;
  parentId: string | null;
  photoUrl: string;
  user: string;
  username: string;
  post: string;
  _id: string;
};

type CommentList = {
  comments: Comment[];
};

type TweetSlice = {
  feedTweets: Tweet[];
  allTweets: Tweet[];
  userTweets: Tweet[];
  singleTweet: Tweet | null;
  singleTweetComments: Comment[];
  commentReplies: Comment[];
  loading: boolean;
  editing: boolean;
  commentsLoading: boolean;
  error: string | null;
};

type DislikeTweet = {
  post: string;
  user: string;
  _id: string;
};

type TweetTypes = "feedTweets" | "allTweets" | "userTweets";
export { TweetSlice, TweetTypes, Tweet, DislikeTweet, Comment, CommentList };
