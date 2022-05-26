import axios from "axios";

/**
 * @description: This function is used to make a REQUEST to the backend server
 * @param {type}  url: string
 * @param {type} method: string
 * @param {type} data?: object
 * @returns: Promise
 */
export const axiosCall: any = async (url: string, method: string, data?: any) => {
  try {
    const response = await axios({
      method,
      url: "https://social-app-twitter.herokuapp.com/api/v1" + url,
      data,
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error) {
    return error;
  }
}