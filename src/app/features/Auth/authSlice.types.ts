type ValidUser = {
  responseType?: "SUCCESS";
  username: string;
  _id: string;
  createdAt: string;
  email: string;
  bio?: string;
  followers: string[];
  followersCount: number;
  followingCount: number;
  followings: string[];
  location?: string;
  name: string;
  photo: {
    id?: string;
    secure_url: string;
  };
  website?: string;
};

type User = ValidUser | null;

type AuthState = {
  user: User;
  isLoggedIn: boolean;
  loginStatus: "idle" | "succeeded" | "failed";
  error: string | null;
};

type FollowAction = {
  user: User;
  followee: User;
};

type loginData = {
  email: string;
  password: string;
};

type signupData = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export { ValidUser, User, AuthState, FollowAction, loginData, signupData };
