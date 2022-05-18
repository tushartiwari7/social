export const axiosConfig = {
  baseURL: "http://localhost:4000/api/v1",
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem("token"),
    'Content-Type': 'application/json'
  }
};

export const log = (msg:any)=>console.log(msg);