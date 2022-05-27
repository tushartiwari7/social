import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosCall} from "app/utils";

export const login:any = createAsyncThunk("auth/login", async (userData:any,thunkAPI:any) => {
	try {
		const {data}:any = await axiosCall("/login", "post", userData);
		if(data.success) {
			localStorage.setItem("token", data.token);
			return data.user;
		}
	} catch (error: any) {
		console.error({error});
		return thunkAPI.rejectWithValue(error.response.data.message);
	}
});
	
export const signup:any = createAsyncThunk("auth/signup", async (userData:any,thunkAPI:any) => {
	try {
		const {data}:any = await axiosCall("/signup", "post", userData);
		if(data.success){
			localStorage.setItem("token", data.token);
			return data.user;
		}
	} catch (error: any) {
		console.error({error});
		return thunkAPI.rejectWithValue(error.response.data.message);
	}
});

export const getAuthUser:any = createAsyncThunk("auth/user", async (_,thunkAPI:any) => {
	try {
		const {data}:any = await axiosCall("/user/profile", "get");
		if(data.success)
			return data.user;
	} catch (error: any) {
		return thunkAPI.rejectWithValue(error.response.data.message);
	}
});

export const getUser:any = createAsyncThunk("auth/getUser", async (userId: string) => {
	try {
		const {data}:any = await axiosCall("/user/" + userId, "get");
		if(data.success)
			return data.user;
	} catch (error: any) {
		console.error({error});
		return Promise.reject(error.response.data.message);
	}
});

export const updateUser:any = createAsyncThunk("auth/updateUser", async (userData:any,{rejectWithValue}) => {
	try {
		const {data}:any = await axiosCall("/user/update_user_details", "post", userData);
		if(data.success)
			return data.user;
	} catch (error: any) {
		return rejectWithValue(error.response.data.message);
	}
}
);

export const followUser:any = createAsyncThunk("auth/followUser", async (followeeId:string,{rejectWithValue}) => {
	try {
		const {data}:any = await axiosCall("/user/follow/" + followeeId, "put");		
		if(data.success){
			return {user: data.user,followee: data.followee};
		}
	} catch (error: any) {
		return rejectWithValue(error.response.data.message);
	}
});

export const unfollowUser:any = createAsyncThunk("auth/unfollowUser", async (followeeId:string,thunkAPI:any) => {
	try {
		const {data}:any = await axiosCall("/user/unfollow/" + followeeId, "patch");
		if(data.success){
			return {user: data.user,followee: data.followee};
		}
	} catch (error: any) {
		return thunkAPI.rejectWithValue(error.response.data.message);
	}
});
