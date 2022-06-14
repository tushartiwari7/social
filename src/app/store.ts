import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import auth from './features/authSlice';
import users from './features/userSlice';
import tweets from './features/tweetSlice';
import bookmarks from './features/bookmarkSlice';

export const store = configureStore({
	reducer: {
		auth,
		users,
		tweets,
		bookmarks
	}
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {auth, users, tweets, bookmarks}
export type AppDispatch = typeof store.dispatch;

// Use throughout the app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;