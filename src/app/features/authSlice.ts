import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosConfig, axiosConfigWithoutHeader } from "../utils";

const initialState = {
  user: {},
  isLoggedIn: false,
	loginStatus: "idle",
	error: '',
};

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

export const authState = createSlice({
  name: "auth",
  initialState,
	reducers: {
		logout: ()=>{
			sessionStorage.removeItem("token");
			return initialState;
		},
	},
	extraReducers: {
		[login.fulfilled]: (state: any, action: any) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.loginStatus = "succeeded";
		},
		[login.rejected]: (state: any, action: any) => {
			state.user = {};
			state.isLoggedIn = false;
			state.loginError = action.payload;
		},
		[signup.fulfilled]: (state: any, action: any) => {
			state.user = action.payload;
			state.isLoggedIn = true;
			state.loginStatus = "succeeded";
		},
		[signup.rejected]: (state: any, action: any) => {
			state.user = {};
			state.isLoggedIn = false;
			state.loginError = action.payload;
		},
		[updateUser.fulfilled]: (state: any, action: any) => {
			state.user = action.payload;
			state.loginStatus = "succeeded";
		},
		[updateUser.rejected]: (state: any, action: any) => {
			state.loginError = action.payload;
		},
		[followUser.fulfilled]: (state: any, action: any) => {
			state.user = action.payload.user;
		},
		[followUser.rejected]: (state: any, action: any) => {
			state.loginError = action.payload;
		},
		[unfollowUser.fulfilled]: (state: any, action: any) => {
			state.user = action.payload.user;
		},
		[unfollowUser.rejected]: (state: any, action: any) => {
			state.loginError = action.payload;
		},
		[getUser.fulfilled]: (state: any, action: any) => {
			state.user = action.payload;
			state.isLoggedIn = true;
		}
	}	
});

export const {logout} = authState.actions;
export default authState.reducer; // exports extraReducers{}
