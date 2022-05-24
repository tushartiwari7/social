import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dislikeTweet, likeTweet } from "./thunkApiCalls/tweetThunk";

export const bookmarkTweet:any = createAsyncThunk("bookmark/add",async (tweetId:string,{rejectWithValue})=>{
	try {
		const {data} = await axios({
			method: "post",
			url: "https://social-app-twitter.herokuapp.com/api/v1/user/bookmark/" + tweetId,
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem("token")}`,
				"Content-Type": "application/json",
			}
		});
		if(data.success)
			return data.bookmark;
	} catch (error: any) {
		return rejectWithValue(error.data.response.message);
	}
});

export const removeBookmark:any = createAsyncThunk("bookmark/remove",async (bookmarkId:string,{rejectWithValue})=>{
	try {
		const {data} = await axios({
			method: "delete",
			url: "https://social-app-twitter.herokuapp.com/api/v1/user/bookmark/" + bookmarkId,
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem("token")}`,
				"Content-Type": "application/json",
			}
		});
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
      const { data } = await axios.get("https://social-app-twitter.herokuapp.com/api/v1/user/bookmarks",{
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem("token")}`,
					"Content-Type": "application/json",
				}
			});
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
			state = state.filter((bookmark:any)=>{
				return bookmark._id !== action.payload._id;
			});
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
		}
	}
});

export default bookmarkSlice.reducer;
