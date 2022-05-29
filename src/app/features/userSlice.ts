import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosCall } from "app/utils";

export const getAllUsers:any = createAsyncThunk("users/all",async ()=>{
	try {
		const {data}:any = await axiosCall("/users", "get");
		if(data.success)
			return data.users;
	}catch(err:any) {
		return Promise.reject(err.response.data.message);
	}
});

export const getFollowers:any = createAsyncThunk("users/followers",async (userId:string)=>{
	try {
		const {data}:any = await axiosCall("/user/followers/" + userId, "get");
		if(data.success)
			return data.followers;
	} catch(err:any) {
		return Promise.reject(err.response.data.message);
	}
});

export const getFollowings:any = createAsyncThunk("users/followings",async (userId: string)=>{
	try {
		const {data}:any = await axiosCall("/user/followings/" + userId, "get");
		if(data.success)
			return data.followings;
	}catch(err:any) {
		return Promise.reject(err.response.data.message);
	}
});

export const searchUsers:any = createAsyncThunk("users/search",async (search:string)=>{
	try {
		const {data}:any = await axiosCall("/search_users?name=" + search, "get");
		if(data.success)
			return data.users;
	}catch(err:any) {
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
			return state;
		}
	},
});

export default userState.reducer;