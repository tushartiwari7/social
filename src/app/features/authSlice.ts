import { createSlice } from "@reduxjs/toolkit";
import { followUser, getUser, login, signup, unfollowUser, updateUser } from "./thunkApiCalls/authThunk";

const initialState = {
  user: {},
  isLoggedIn: false,
	loginStatus: "idle",
	error: '',
};

export const authState = createSlice({
  name: "auth",
  initialState,
	reducers: {
		logout: (state: any)=>{
			sessionStorage.removeItem("token");
			state =  initialState;
			return state;
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
