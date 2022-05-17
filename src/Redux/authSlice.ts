import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosConfig } from "./utils";

const initialState = {
  user: {},
  isLoggedIn: false,
	loginStatus: "idle",
	loginError: '',
};

export const login:any = createAsyncThunk("auth/login", async (userData:any,thunkAPI:any) => {
	try {
		const {data}:any = await axios.post("/login", userData,axiosConfig);
		if(data.success) {
			return data.user;
		}
	} catch (error: any) {
		console.error({error});
		return thunkAPI.rejectWithValue(error.response.data.message);
	}
});

export const signup:any = createAsyncThunk("/signup", async (userData:any,thunkAPI:any) => {
	try {
		console.log({userData});
		const {data}:any = await axios.post("/signup", userData,axiosConfig);
		if(data.success)
			return data.user;
	} catch (error: any) {
		console.error({error});
		return thunkAPI.rejectWithValue(error.response.data.message);
	}

});
export const authState = createSlice({
  name: "auth",
  initialState,
	reducers: {},
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
		}
	}	
});

export default authState.reducer; // exports extraReducers{}
