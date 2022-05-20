import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers:any = createAsyncThunk("users/all",async ()=>{
	try {
		const token = sessionStorage.getItem("token");
		const {data}:any = await axios({
			method: "get",
			url: "https://social-app-twitter.herokuapp.com/api/v1/users",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + token
			}
		});
		return data.users;
	}catch(err:any) {
		console.error({err});
		return Promise.reject(err.response.data.message);
	}
});


export const getFollowers:any = createAsyncThunk("users/followers",async (userId:string)=>{
	try {
		const {data}:any = await axios({
			method: "get",
			url: `https://social-app-twitter.herokuapp.com/api/v1/user/followers/${userId}`,
			headers: {
				Authorization: "Bearer " + sessionStorage.getItem("token"),
				"Content-Type": "application/json"
			}
		});
		return data.followers;
	}catch(err:any) {
		console.error({err});
		return Promise.reject(err.response.data.message);
	}
});

export const getFollowings:any = createAsyncThunk("users/followings",async (userId: string)=>{
	try {
		const {data}:any = await axios({
			method: "get",
			url: `https://social-app-twitter.herokuapp.com/api/v1/user/followings/${userId}`,
			headers: {
				Authorization: "Bearer " + sessionStorage.getItem("token"),
				"Content-Type": "application/json"
			}
		});
		return data.followings;
	}catch(err:any) {
		console.error({err});
		return Promise.reject(err.response.data.message);
	}
});


export const userState = createSlice({
	name: "user",
	initialState: [],
	reducers: {},
	extraReducers: {
		[getAllUsers.fulfilled]: (state: any, action: any) => {
			state = action.payload;
			return action.payload;
		}
	},
});

export default userState.reducer;
