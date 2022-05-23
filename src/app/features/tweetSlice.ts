import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
	feedTweets: [],
	allTweets: [],
	userTweets: [],
	singleTweet: {},
	loading: false,
	error: ""
}

export const postTweet:any = createAsyncThunk("tweet/post", async (tweet:any, { rejectWithValue }) => {
	try {
		const {data} = await axios({
			method: "post",
			url: "http://social-app-twitter.herokuapp.com/api/v1/tweets",
			data: tweet,
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem("token")}`,
				"Content-Type": "application/json",
			}
		});
		if(data.success){
			return data.tweet;
		}
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const getUserTweets:any = createAsyncThunk(
  "tweet/getUserTweets",
  async (userId: string,{rejectWithValue}) => {
    try {
      const { data } = await axios.get("http://social-app-twitter.herokuapp.com/api/v1/tweets/userTweets/" + userId, {
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem("token")}`,
					"Content-Type": "application/json",
				}
			});

			if (data.success) {
				return data.tweets;
			}
	
		} catch (error:any) {
				return rejectWithValue(error.response.data.message);
		}
  }
);

export const getFeed:any = createAsyncThunk("tweet/feed", async (state,{rejectWithValue}) => {
try {
	const {data} = await axios({
		method: "get",
		url: "https://social-app-twitter.herokuapp.com/api/v1/tweets/feed",
		headers: {
			Authorization: `Bearer ${sessionStorage.getItem("token")}`,
			"Content-Type": "application/json",
		}
	});
	if(data.success)
		return data.tweets;
	throw new Error(data.message);
} catch (error) {
	return rejectWithValue(error);
}
});

export const getSingleTweet:any = createAsyncThunk("tweet/single", async (tweetId:string,{rejectWithValue}) => {
	try {
		const {data} = await axios({
			method: "get",
			url: "http://social-app-twitter.herokuapp.com/api/v1/tweets/" + tweetId,
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem("token")}`,
				"Content-Type": "application/json",
			}
		});
		if(data.success)
			return data.tweet;
	} catch (error:any) {
		return rejectWithValue(error.response.data.message);
	}
});

export const tweetSlice = createSlice({
	name: "tweet",
	initialState,
	reducers: {},
	extraReducers: {
		[postTweet.fulfilled]: (state:any, action) => {
			state.feedTweets = [action.payload, ...state.feedTweets];
			state.allTweets = [action.payload, ...state.allTweets];
		},
		[getFeed.fulfilled]: (state:any, action) => {
			state.feedTweets = action.payload;
			state.loading = false;
		},
		[getFeed.pending]: (state:any) => {
			state.loading = true;
		},
		[getUserTweets.fulfilled]: (state:any, action) => {
			state.userTweets = action.payload;
			state.loading = false;
		},
		[getUserTweets.rejected]: (state:any, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		[getUserTweets.pending]: (state:any) => {
			state.loading = true;
		},
		[getSingleTweet.fulfilled]: (state:any, action) => {
			state.singleTweet = action.payload;
			state.error = "";
			state.loading = false;
		},
		[getSingleTweet.rejected]: (state:any, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		[getSingleTweet.pending]: (state:any) => {
			state.loading = true;
		}
	},
})

export default tweetSlice.reducer;