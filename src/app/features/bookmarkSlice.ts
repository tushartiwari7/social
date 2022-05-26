import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteTweet, dislikeTweet, editTweet, likeTweet } from "./thunkApiCalls/tweetThunk";
import { axiosCall } from "app/utils";

export const bookmarkTweet:any = createAsyncThunk("bookmark/add",async (tweetId:string,{rejectWithValue})=>{
	try {
		const {data} = await axiosCall("/user/bookmark/" + tweetId, "post");
		if(data.success)
			return data.bookmark;
	} catch (error: any) {
		return rejectWithValue(error.data.response.message);
	}
});

export const removeBookmark:any = createAsyncThunk("bookmark/remove",async (bookmarkId:string,{rejectWithValue})=>{
	try {
		const {data} = await axiosCall("/user/bookmark/" + bookmarkId, "delete");
		if(data.success)
			return data.bookmark;
	} catch (error: any) {
		return rejectWithValue(error.data.response.message);
	}
});

export const getBookmarks:any = createAsyncThunk(
  "user/getBookmark",
  async () => {
    try {
      const { data } = await axiosCall("/user/bookmarks", "get");
      if (data.success) {
        return data.bookmarks;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
);


export const bookmarkSlice = createSlice({
	name: "bookmarks",
	initialState: [],
	reducers: {},
	extraReducers: {
		[bookmarkTweet.fulfilled]: (state:any,action)=>{
			state.unshift(action.payload);
		},
		[removeBookmark.fulfilled]: (state:any,action)=>{
			state = state.filter((bookmark:any)=>bookmark._id !== action.payload._id);
			return state;
		},
		[deleteTweet.fulfilled]: (state:any,action)=>{
			state = state.filter((bookmark:any)=>bookmark.post._id !== action.payload._id);
			return state;
		},
		[getBookmarks.fulfilled]: (state:any,action)=>{
			state.push(...action.payload);
		},
		[likeTweet.fulfilled]: (state:any,action)=>{
			state = state.map((tweet:any) => {
				if(tweet.post._id === action.payload._id){
					tweet.post = action.payload;
					return tweet;
				}
				return tweet;
			});
		},
		[dislikeTweet.fulfilled]: (state:any,action)=>{
			state = state.map((tweet:any) => {
				if(tweet.post._id === action.payload.post){
					tweet.post =  {
						...tweet.post,
						likes: tweet.post.likes.filter((like:string) => like !== action.payload.user),
						statistics: {...tweet.post.statistics, likeCount: tweet.post.statistics.likeCount - 1}
					};
					return tweet;
				}
				return tweet;
			})
		},
		[editTweet.fulfilled]: (state:any,action)=>{
			state = state.map((tweet:any) => tweet._id === action.payload._id? action.payload : tweet);
		}
	}
});

export default bookmarkSlice.reducer;
