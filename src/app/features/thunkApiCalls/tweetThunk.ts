import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosCall } from "app/utils";

export const addComment: any = createAsyncThunk("post/comment", async (comment, { rejectWithValue }) => {
	try {
		const {data} = await axiosCall("/post/comment", "POST", comment);
		if(data.success)
		return data.comment;
	} catch (error:any) {
		rejectWithValue(error.data.response.message);
	}
});

export const getComments: any = createAsyncThunk("post/getComments", async (tweetId, { rejectWithValue }) => {
	try {
		const {data} = await axiosCall("/post/comment/"+tweetId, "get");
		if(data.success)
			return data.comments;
	} catch (error:any) {
		rejectWithValue(error.data.response.message);
	}
});

export const deleteComment: any = createAsyncThunk("post/deleteComment", async (commentId, { rejectWithValue }) => {
	try {
		const {data} = await axiosCall("/post/comment/" + commentId, "delete");
		if(data.success) 
		 return data.comment;		
	} catch (error:any) {
		rejectWithValue(error.data.response.message);
	}
});

export const postTweet:any = createAsyncThunk("tweet/post", async (tweet:any, { rejectWithValue }) => {
	try {
		const {data} = await axiosCall("/tweets", "post", tweet);
		if(data.success)
			return data.tweet;
	} catch (error:any) {
		return rejectWithValue(error.data.response.message);
	}
});

export const getUserTweets:any = createAsyncThunk(
  "tweet/getUserTweets",
  async (userId: string,{rejectWithValue}) => {
    try {
      const { data } = await axiosCall("/tweets/userTweets/" + userId,"get");
			if (data.success)
				return data.tweets;
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
} catch (error:any) {
	return rejectWithValue(error.response.data.message);
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
		const {data} = await axiosCall("/tweets/" + tweetId, "get");
		if(data.success)
			return data.tweet;
	} catch (error:any) {
		return rejectWithValue(error.response.data.message);
	}
});

export const likeTweet:any = createAsyncThunk("tweet/like", async (tweetId: string, {rejectWithValue}) => {
	try {
		const {data} = await axiosCall("/tweet/like/" + tweetId, "post");
		if(data.success)
			return data.like.post;
	} catch (error:any) {
		return rejectWithValue(error.response.data.message);
	}
});

export const dislikeTweet:any = createAsyncThunk("tweet/dislike", async (tweetId: string, {rejectWithValue}) => {
	try {
		const {data} = await axiosCall("/tweet/like/" + tweetId, "delete");
		if(data.success)
			return data.like;
	} catch (error:any) {
		return rejectWithValue(error.response.data.message);
	}
});

export const deleteTweet:any = createAsyncThunk("tweet/delete", async (tweetId: string, {rejectWithValue}) => {
	try {
		const {data} = await axiosCall("/tweets/" + tweetId, "delete");
		if(data.success)
			return data.tweet;
	} catch (error:any) {
		return rejectWithValue(error.response.data.message);
	}
});

type editTweetType = {
	tweetId: string,
	formData?: any
}

export const editTweet:any = createAsyncThunk("tweet/edit", async ({tweetId,formData}: editTweetType, {rejectWithValue}) => {
	try {
		const {data} = await axiosCall("/tweets/" + tweetId, "put", formData);
		if(data.success)
			return data.tweet;
	} catch (error:any) {
		return rejectWithValue(error.data.response.message);
	}
});