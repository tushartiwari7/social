
<div align="center">
  <img src="https://user-images.githubusercontent.com/66322728/172832239-6a237243-be7b-45ea-9a4a-cbfb4261b9e8.png" height="100" width="100" alt="logo"/>
  <h1><a href="https://www.tushar.social">Elevate Social</a></h1>
    <p>A Social Media Application to share Tweets, meet new People and interact with creative minds.</p>
 </div>


## How to run the app locally?
```
$ git clone https://github.com/tushartiwari7/social.git
$ cd social
$ npm install
$ npm start
```

## App Screens -
- Authentication (Login, Signup) Pages
- Home Page
- Explore Page
- Bookmarks Page
- Profile Page
- Single Tweet Page
- Connections - Followers/Followings page

## Features
- **Authentication using JWT** along with form validation for Login and Signup Pages.
- User can perform **CRUD operations** on his own Tweets and Comments.
- JPG/PNG **Images** less than 2MB can be attached with Tweets.
- User can **like or unlike** any Tweet.
- User can add or remove post from **bookmarks**.
- Home Page where user can see their tweets and the **tweets of friends followed by user**.
- Explore Page where **all the posts** will be visible.
- **Sort the Tweets** by either Trending, Latest or Oldest on Home, Explore and Profile Page.
- Bookmarks Page where all the **posts bookmarked** by user will be visible.
- Profile Page where user can **edit their profile**. It contains details like **Avatar, Bio, Location, Followers, Followings and Portfolio URL**.
- **Persist User State** on reload - Login once and it's enough.
- User can **follow or unfollow** other users from Profile Page, Suggestions, Followers & Followings Page.
- User can view the Profile, Followers/Followings of any user.
- Search Users by their First Name/ Last Name.
- Suggestions with Follow Switch on all pages.
- User can view all the comments of the post on the Individual Tweet Page.
- User can comment on Tweet, some other comment's or comment on comment and so on.
- Loader is shown while the Data is fetched, it can be Tweets, Comments etc.
- Alerts in the app to notify the users about success/failure operations.
- All the screens are Responsive.

## Tech Stack and Tools
- Frontend: React + TypeScript
- State Management: Redux Toolkit
- Design Library: Ant Design 
- Database Management: MongoDB
- Backend: Node, ExpressJS
- Image Storage: Cloudinary
- Auto Formatter: Prettier
- IDE: VS Code

## Demo Video

https://user-images.githubusercontent.com/66322728/172871843-1ad508dc-af7d-47af-85eb-80e42e2017fb.mp4

https://user-images.githubusercontent.com/66322728/172872049-b2e6595a-d40c-49a8-8c2d-82621c2bea30.mp4
