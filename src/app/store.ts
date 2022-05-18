import { configureStore } from "@reduxjs/toolkit";
import auth from './features/authSlice';
import users from './features/userSlice';
export const store:any = configureStore({
	reducer: {
		auth,
		users,
	}
});