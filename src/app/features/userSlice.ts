import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosConfig } from "app/utils";
import axios from "axios";

export const getAllUsers:any = createAsyncThunk("users/all",async ()=>{
	try {
		const {data}:any = await axios.get("/users",axiosConfig);
		return data.users;
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
			console.log({action});
			state = action.payload;
			return action.payload;
		}
	},
});

export default userState.reducer;
