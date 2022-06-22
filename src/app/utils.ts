import axios from "axios";
import { Bookmark } from "./features";
import { User } from "./features/Auth/authSlice.types";
import { Comment, DislikeTweet, Tweet } from "./features/Tweet/tweet.types";

/**
 * @description: This function is used to make a REQUEST to the backend server
 * @param {type}  url: string
 * @param {type} method: string
 * @param {type} data?: object
 * @returns: Promise
 */

// TODO: Not using currently will be using after refactoring axios calls part. - if that day comes ;)
export type AxiosError = {
  code: "ERR_BAD_REQUEST" | "ERR_BAD_RESPONSE";
  message: string;
  name: string;
  response: {
    data: {
      success: boolean;
      message: string;
    };
    status: number;
    statusText: string;
  };
};

type LikeResponse = {
  user: string;
  post: Tweet;
  _id: string;
};

export type AxiosResponse = {
  data: {
    success: boolean;
    token?: string;
    user?: User;
    followee?: User;
    users?: User[];
    followings?: User[];
    followers?: User[];
    tweet?: Tweet;
    tweets?: Tweet[];
    bookmarks?: Bookmark[];
    bookmark: Bookmark;
    like?: LikeResponse;
    comment?: Comment;
    comments?: Comment[];
    message?: string;
  };
  status: number;
  statusText: string;
};

export async function axiosCall(
  url: string,
  method: string,
  data?: any
): Promise<AxiosResponse> {
  try {
    const response: AxiosResponse = await axios({
      method,
      url: "https://social-app-twitter.herokuapp.com/api/v1" + url,
      data,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return response;
  } catch (error: any) {
    return error;
  }
}

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export const stateUpdate = (tweet: Tweet, response: Tweet) => {
  if (tweet._id === response._id) {
    return response;
  }
  return tweet;
};

export const dislikeUpdate = (tweet: Tweet, response: DislikeTweet) => {
  if (tweet._id === response.post) {
    return {
      ...tweet,
      likes: tweet.likes.filter((like) => like !== response.user),
      statistics: {
        ...tweet.statistics,
        likeCount: tweet.statistics.likeCount - 1,
      },
    };
  }
  return tweet;
};

export const commentUpdate = (
  tweet: Tweet,
  response: Comment,
  decrement: boolean = false
) => {
  if (tweet._id === response.post) {
    return {
      ...tweet,
      statistics: {
        ...tweet.statistics,
        commentCount: decrement
          ? tweet.statistics.commentCount - 1
          : tweet.statistics.commentCount + 1,
      },
    };
  }
  return tweet;
};
