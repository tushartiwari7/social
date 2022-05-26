import { createSlice } from "@reduxjs/toolkit";
import { commentUpdate, dislikeUpdate, stateUpdate } from "app/utils";
import { addComment, deleteComment, deleteTweet, dislikeTweet, editTweet, getAllTweets, getComments, getFeed, getSingleTweet, getUserTweets, likeTweet, postTweet } from "./thunkApiCalls/tweetThunk";

const initialState = {
	feedTweets: [],
	allTweets: [],
	userTweets: [],
	singleTweet: {},
	singleTweetComments: [],
	loading: false,
	editing: false,
	commentsLoading: false,
	error: ""
};
const states = ['feedTweets', 'allTweets', 'userTweets'];


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
		[getAllTweets.fulfilled]: (state:any, action) => {
			state.allTweets =action.payload;
			state.loading = false;
		},
		[getAllTweets.pending]: (state:any) => {
			state.loading = true;
		},
		[getAllTweets.rejected]: (state:any,action) => {
			state.error = action.payload;
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
			states.forEach((key:string) => {
				state[key] = state[key].map((tweet:any) => stateUpdate(tweet, action.payload));
			});

			if(state.singleTweet._id === action.payload._id)
				state.singleTweet = action.payload;
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
			states.forEach((key:string) => {
				state[key] = state[key].map((tweet:any) => dislikeUpdate(tweet, action.payload));
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
		[addComment.fulfilled]: (state:any, action) => {
			state.singleTweetComments.unshift(action.payload);
			state.singleTweet.statistics.commentCount++;
			
			states.forEach((key:string) => {
				state[key] = state[key].map((tweet:any) => commentUpdate(tweet, action.payload));
			});

			state.commentsLoading = false;
		},
		[addComment.pending]: (state:any) => {	
			state.commentsLoading = true;
		},
		[getComments.fulfilled]: (state:any, action) => {
			state.singleTweetComments = action.payload;
			state.commentsLoading = false;
		},
		[getComments.pending]: (state:any) => {
			state.commentsLoading = true;
		},
		[deleteTweet.fulfilled]: (state:any, action) => {
			states.forEach((key:string) => {
				state[key] = state[key].filter((tweet:any) => tweet._id !== action.payload._id);
			});
			state.singleTweet = {};
			state.loading = false;
		},
		[deleteTweet.pending]: (state:any) => {
			state.loading = true;
		},
		[editTweet.fulfilled]: (state:any, action) => {
			states.forEach((key:string) => {
				state[key] = state[key].map((tweet:any) => tweet._id === action.payload._id? action.payload : tweet);
			});

			if(state.singleTweet._id === action.payload._id)
				state.singleTweet = action.payload;
			state.editing = false;
		},
		[editTweet.pending]: (state:any) => {
			state.editing = true;
		},
		[editTweet.rejected]: (state:any, action) => {
			state.error = action.payload;
			state.editing = false;
		},
		[deleteComment.fulfilled]: (state:any, action) => {

			states.forEach((key:string) => {
				state[key] = state[key].map((tweet:any) => commentUpdate(tweet, action.payload,true));
			});

			state.singleTweetComments = state.singleTweetComments.filter((comment:any) => comment._id !== action.payload._id);
			state.singleTweet.statistics.commentCount = state.singleTweet.statistics.commentCount - 1;
			state.commentsLoading = false;
		},
		[deleteComment.pending]: (state:any) => {
			state.commentsLoading = true;
		},
		[deleteComment.rejected]: (state:any, action) => {
			state.error = action.payload;
			state.commentsLoading = false;
		}
	},
})

export default tweetSlice.reducer;