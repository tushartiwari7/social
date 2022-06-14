import axios from "axios";
import { User } from "./features/Auth/authSlice.types";

/**
 * @description: This function is used to make a REQUEST to the backend server
 * @param {type}  url: string
 * @param {type} method: string
 * @param {type} data?: object
 * @returns: Promise
 */

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

type AxiosResponse = {
  data: {
    success: boolean;
    token?: string;
    user?: User;
    followee?: User;
    users?: User[];
    tweet?: any;
    tweets?: any[]; // TODO: add type
    bookmarks?: any[]; // TODO: add type
    bookmark: any; // TODO: add type
    like?: any; // TODO: add type
    comment?: any; // TODO: add type
    comments?: any[]; // TODO: add type
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

export const stateUpdate: any = (tweet: any, response: any) => {
  if (tweet._id === response._id) {
    return response;
  }
  return tweet;
};

export const dislikeUpdate = (tweet: any, response: any) => {
  if (tweet._id === response.post) {
    return {
      ...tweet,
      likes: tweet.likes.filter((like: string) => like !== response.user),
      statistics: {
        ...tweet.statistics,
        likeCount: tweet.statistics.likeCount - 1,
      },
    };
  }
  return tweet;
};

export const commentUpdate = (
  tweet: any,
  response: any,
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
