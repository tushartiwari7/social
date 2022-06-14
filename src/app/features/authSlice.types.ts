type User =
  | {
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
      username: string;
      website?: string;
    }
  | {};

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

export { User, AuthState, FollowAction };
