import { createSlice } from "@reduxjs/toolkit";
import { addComment, dislikeTweet, getComments, getFeed, getSingleTweet, getUserTweets, likeTweet, postTweet } from "./thunkApiCalls/tweetThunk";

const initialState = {
	feedTweets: [],
	allTweets: [],
	userTweets: [],
	singleTweet: {},
	singleTweetComments: [],
	loading: false,
	commentsLoading: false,
	error: ""
};


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
		[addComment.fulfilled]: (state:any, action) => {
			state.singleTweetComments.unshift(action.payload);
			state.singleTweet.statistics.commentCount = state.singleTweet.statistics.commentCount + 1;
			
			state.feedTweets = state.feedTweets.map((tweet:any) => {
				if(tweet._id === action.payload.post){
					return {
						...tweet,
						statistics: {...tweet.statistics, commentCount: tweet.statistics.commentCount + 1}
					};
				}
				return tweet;
			})

			state.userTweets = state.userTweets.map((tweet:any) => {
				if(tweet._id === action.payload.post){
					return {
						...tweet,
						statistics: {...tweet.statistics, commentCount: tweet.statistics.commentCount + 1}
					};
				}
				return tweet;
			});

			state.allTweets = state.allTweets.map((tweet:any) => {
				if(tweet._id === action.payload.post){
					return {
						...tweet,
						statistics: {...tweet.statistics, commentCount: tweet.statistics.commentCount + 1}
					};
				}
				return tweet;
			})

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
		}
	},
})

export default tweetSlice.reducer;