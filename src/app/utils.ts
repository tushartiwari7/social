export const axiosConfig = {
  baseURL: window.location.hostname === "loclhost"? "http://localhost:4000/api/v1":"https://social-app-twitter.herokuapp.com/api/v1",
  headers: {
    'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
    'Content-Type': 'application/json'
  }
};

export const axiosConfigWithoutHeader = {
  baseURL: window.location.hostname === "loalhost"? "http://localhost:4000/api/v1":"https://social-app-twitter.herokuapp.com/api/v1",
  headers: {
    'Content-Type': 'application/json'
  }
};
