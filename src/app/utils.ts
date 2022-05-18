export const axiosConfig = {
  baseURL: "https://social-app-twitter.herokuapp.com/api/v1",
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem("token"),
    'Content-Type': 'application/json'
  }
};

export const log = (msg:any)=>console.log(msg);