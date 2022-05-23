import { configureStore } from "@reduxjs/toolkit";
import auth from './features/authSlice';
import users from './features/userSlice';
import tweets from './features/tweetSlice';
export const store:any = configureStore({
	reducer: {
		auth,
		users,
		tweets
	}
});