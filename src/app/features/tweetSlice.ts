import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	feedTweets: [],
	allTweets: [],
	userTweets: [],
	singleTweet: {},
	loading: false,
	error: ""
};

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
      const { data } = await axios.get("https://social-app-twitter.herokuapp.com/api/v1/tweets/userTweets/" + userId, {
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

export const likeTweet:any = createAsyncThunk("tweet/like", async (tweetId: string, {rejectWithValue}) => {
	try {
		const {data} = await axios({
			method: "post",
			url: "http://social-app-twitter.herokuapp.com/api/v1/tweet/like/" + tweetId,
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem("token")}`,
				"Content-Type": "application/json",
			}
		});
		if(data.success)
			return data.like.post;
	} catch (error:any) {
		return rejectWithValue(error.response.data.message);
	}
});

export const dislikeTweet:any = createAsyncThunk("tweet/dislike", async (tweetId: string, {rejectWithValue}) => {
	try {
		const {data} = await axios({
			method: "delete",
			url: "http://social-app-twitter.herokuapp.com/api/v1/tweet/like/" + tweetId,
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem("token")}`,
				"Content-Type": "application/json",
			}
		});
		console.log(data);
		
		if(data.success)
			return data.like;
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
		},
		[likeTweet.fulfilled]: (state:any, action) => {
			console.log(action.payload);
			
			state.feedTweets = state.feedTweets.map((tweet:any) => {
				if(tweet._id === action.payload._id){
					return action.payload;
				}
				return tweet;
			});
			
			state.allTweets = state.allTweets.map((tweet:any) => {
				if(tweet._id === action.payload._id){
					return action.payload;
				}
				return tweet;
			});
			
			state.userTweets = state.userTweets.map((tweet:any) => {
				if(tweet._id === action.payload._id){
					return action.payload;
				}
				return tweet;
			});
			 
			if(state.singleTweet._id === action.payload._id){
				state.singleTweet = action.payload;
			}
			state.loading = false;
		},
		[likeTweet.pending]: (state:any) => {
			state.loading = true;
		},
		[likeTweet.rejected]: (state:any, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		[dislikeTweet.fulfilled]: (state:any, action) => {
			state.feedTweets = state.feedTweets.map((tweet:any) => {
				if(tweet._id === action.payload.post){
					return {
						...tweet,
						likes: tweet.likes.filter((like:string) => like !== action.payload.user),
						statistics: {...tweet.statistics, likeCount: tweet.statistics.likeCount - 1}
					};
				}
				return tweet;
			})
			state.allTweets = state.allTweets.map((tweet:any) => {
				if(tweet._id === action.payload.post){
					return {
						...tweet,
						likes: tweet.likes.filter((like:string) => like !== action.payload.user),
						statistics: {...tweet.statistics, likeCount: tweet.statistics.likeCount - 1}
					};
				}
				return tweet;
			})

			state.userTweets = state.userTweets.map((tweet:any) => {
				if(tweet._id === action.payload.post){
					return {
						...tweet,
						likes: tweet.likes.filter((like:string) => like !== action.payload.user),
						statistics: {...tweet.statistics, likeCount: tweet.statistics.likeCount - 1}
					};
				}
				return tweet;
			});

			if(state.singleTweet._id === action.payload.post){
				state.singleTweet.likes = state.singleTweet.likes.filter((like:string) => like !== action.payload.user);
				state.singleTweet.statistics.likeCount= state.singleTweet.statistics.likeCount-1;
			}
			state.loading = false;
		},
		[dislikeTweet.pending]: (state:any) => {
			state.loading = true;
		},
		[dislikeTweet.rejected]: (state:any, action) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
})

export default tweetSlice.reducer;