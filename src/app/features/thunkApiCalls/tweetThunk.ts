import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addComment: any = createAsyncThunk("post/comment", async (comment, { rejectWithValue }) => {
	try {
		const {data} = await axios.post("http://localhost:4000/api/v1/post/comment", comment,{
			headers: {
				"Content-Type": "application/json",	
				Authorization: `Bearer ${sessionStorage.getItem("token")}`
			}
		});
		return data.comment;
	} catch (error:any) {
		rejectWithValue(error.data.response.message);
	}
});

export const getComments: any = createAsyncThunk("post/getComments", async (tweetId, { rejectWithValue }) => {
	try {
		const {data} = await axios.get("http://social-app-twitter.herokuapp.com/api/v1/post/comment/" + tweetId,{
			headers: {
				"Content-Type": "application/json",	
				Authorization: `Bearer ${sessionStorage.getItem("token")}`
			}
		});
		return data.comments;
	} catch (error:any) {
		rejectWithValue(error.data.response.message);
	}
});

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
