import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosCall } from "app/utils";
import axios from "axios";

export const addComment: any = createAsyncThunk("post/comment", async (comment, { rejectWithValue }) => {
	try {
		const {data} = await axios.post("https://social-app-twitter.herokuapp.com/api/v1/post/comment", comment,{
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
		const {data} = await axios.get("https://social-app-twitter.herokuapp.com/api/v1/post/comment/" + tweetId,{
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
			url: "https://social-app-twitter.herokuapp.com/api/v1/tweets",
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
	const {data} = await axiosCall("/tweets/feed", "get");
	if(data.success)
		return data.tweets;
	throw new Error(data.message);
} catch (error) {
	return rejectWithValue(error);
}
});

export const getAllTweets:any = createAsyncThunk("tweet/getAllTweets", async (state,{rejectWithValue}) => {
	try {
		const {data} = await axiosCall("/tweets", "get");
		if(data.success)
			return data.tweets;
	} catch (error:any) {
		return rejectWithValue(error.data.response.message);
	}
	});

export const getSingleTweet:any = createAsyncThunk("tweet/single", async (tweetId:string,{rejectWithValue}) => {
	try {
		const {data} = await axios({
			method: "get",
			url: "https://social-app-twitter.herokuapp.com/api/v1/tweets/" + tweetId,
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
			url: "https://social-app-twitter.herokuapp.com/api/v1/tweet/like/" + tweetId,
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
			url: "https://social-app-twitter.herokuapp.com/api/v1/tweet/like/" + tweetId,
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem("token")}`,
				"Content-Type": "application/json",
			}
		});
		if(data.success)
			return data.like;
	} catch (error:any) {
		return rejectWithValue(error.response.data.message);
	}
});

export const deleteTweet:any = createAsyncThunk("tweet/delete", async (tweetId: string, {rejectWithValue}) => {
	try {
		const {data} = await axios({
			method: "delete",
			url: "https://social-app-twitter.herokuapp.com/api/v1/tweets/"+tweetId,
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem("token")}`,
				"Content-Type": "application/json",
			}
		});	
		if(data.success)
			return data.tweet;
	} catch (error) {
		return rejectWithValue(error);
	}
});

type editTweetType = {
	tweetId: string,
	formData?: any
}

/**
 * create slice methods for edit tweet and update state in redux
 * how to send request request from frontend
 * create formdata and call thunk
 */

export const editTweet:any = createAsyncThunk("tweet/edit", async ({tweetId,formData}: editTweetType, {rejectWithValue}) => {
	try {
		const {data} = await axios({
			method: "put",
			url: "https://social-app-twitter.herokuapp.com/api/v1/tweets/"+tweetId,
			data: formData,
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem("token")}`,
				"Content-Type": "application/json",
			}
		});
		if(data.success)
			return data.tweet;
	} catch (error:any) {
		return rejectWithValue(error.data.response.message);
	}
});