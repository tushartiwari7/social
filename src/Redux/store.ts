import { configureStore } from "@reduxjs/toolkit";
import auth from './authSlice';
export const store:any = configureStore({
	reducer: {
		auth: auth
	}
});