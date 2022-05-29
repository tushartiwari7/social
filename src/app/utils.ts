import axios from "axios";

/**
 * @description: This function is used to make a REQUEST to the backend server
 * @param {type}  url: string
 * @param {type} method: string
 * @param {type} data?: object
 * @returns: Promise
 */
export const axiosCall: any = async (
  url: string,
  method: string,
  data?: any
) => {
  try {
    const response = await axios({
      method,
      url:
        (window.location.hostname === "localhost"
          ? "http://localhost:4000/api/v1"
          : "https://social-app-twitter.herokuapp.com/api/v1") + url,
      data,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const stateUpdate = (tweet: any, response: any) => {
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
