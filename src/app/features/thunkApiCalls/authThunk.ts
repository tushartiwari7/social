import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosConfig, axiosConfigWithoutHeader } from "app/utils";
import axios from "axios";

export const login:any = createAsyncThunk("auth/login", async (userData:any,thunkAPI:any) => {
	try {
		const {data}:any = await axios.post("/login", userData, axiosConfigWithoutHeader);
		if(data.success) {
			sessionStorage.setItem("token", data.token);
			return data.user;
		}
	} catch (error: any) {
		console.error({error});
		return thunkAPI.rejectWithValue(error.response.data.message);
	}
});
	
export const signup:any = createAsyncThunk("auth/signup", async (userData:any,thunkAPI:any) => {
	try {
		const {data}:any = await axios.post("/signup", userData,axiosConfigWithoutHeader);
		if(data.success){
			sessionStorage.setItem("token", data.token);
			return data.user;
		}
	} catch (error: any) {
		console.error({error});
		return thunkAPI.rejectWithValue(error.response.data.message);
	}
});

export const getUser:any = createAsyncThunk("auth/getUser", async (userId: string) => {
	try {
		const {data}:any = await axios.get(`/user/${userId}`,axiosConfig);
		if(data.success)
			return data.user;
	} catch (error: any) {
		console.error({error});
		return Promise.reject(error.response.data.message);
	}
});

export const updateUser:any = createAsyncThunk("auth/updateUser", async (userData:any,thunkAPI:any) => {
	try {
		const {data}:any = await axios({
			method: "post",
			url: "https://social-app-twitter.herokuapp.com/api/v1/user/update_user_details",
			data: userData,
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem("token")}`,
				"Content-Type": "application/json",
			}
		});
		if(data.success){
			return data.user;
		}
	} catch (error: any) {
		console.error({error});
		return thunkAPI.rejectWithValue(error.response.data.message);
	}
}
);

export const followUser:any = createAsyncThunk("auth/followUser", async (followeeId:string,thunkAPI:any) => {
	try {
		const {data}:any = await axios({
			method: "put",
			url: `https://social-app-twitter.herokuapp.com/api/v1/user/follow/${followeeId}`,
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem("token")}`,
				"Content-Type": "application/json",
			}
		});
		
		if(data.success){
			return {user: data.user,followee: data.followee};
		}
	} catch (error: any) {
		console.error({error});
		return thunkAPI.rejectWithValue(error.response.data.message);
	}
});

export const unfollowUser:any = createAsyncThunk("auth/unfollowUser", async (followeeId:string,thunkAPI:any) => {
	try {
		const {data}:any = await axios({
			method: "patch",
			url: `https://social-app-twitter.herokuapp.com/api/v1/user/unfollow/${followeeId}`,
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem("token")}`,
				"Content-Type": "application/json",
			}
		});
		
		if(data.success){
			return {user: data.user,followee: data.followee};
		}
	} catch (error: any) {
		console.error({error});
		return thunkAPI.rejectWithValue(error.response.data.message);
	}
});
