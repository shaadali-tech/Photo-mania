# Photoholic Codebase Explanation

## 1) Project Summary

Photoholic is a React + TypeScript social media app with Firebase Authentication and Firestore.
Users can register/login, create posts, explore content, follow other users, receive notifications, and manage profile data.

The app uses:

- Vite for development/build
- React Router for client routing
- Firebase Auth for authentication
- Firestore for app data
- Tailwind CSS (plus shadcn UI primitives) for styling

## 2) Startup and App Boot Flow

Main startup sequence:

1. src/main.tsx mounts the app.
2. BrowserRouter wraps the app for route navigation.
3. AuthProvider wraps the app to keep auth state globally available.
4. App.tsx defines all routes.

Important boot files:

- src/main.tsx
- src/App.tsx
- src/Context/AuthContext.tsx
- src/firebase/firebase.ts

## 3) Firebase Setup

src/firebase/firebase.ts initializes:

- auth: Firebase Auth instance
- db: Firestore instance
- googleProvider: Google login provider

## 4) Authentication Architecture

src/Context/AuthContext.tsx:

- Uses onAuthStateChanged(auth, callback) to track current session.
- Exposes user and loading through a React context.
- useAuth() custom hook provides safe access to auth state.

src/Routes/ProtectedRoute.tsx:

- If auth is still loading, shows a full-screen loading state.
- If user exists, renders nested protected pages via Outlet.
- If user is missing, redirects to /login.

## 5) Routing Structure

Defined in src/App.tsx.

Protected routes (inside ProtectedRoute):

- /
- /profile
- /explore
- /create-post

Public routes:

- /login
- /register
- /search
- /notifications

Fallback:

- - redirects to /

Note:
Search and notifications are currently public in routing config, even though they rely on auth.currentUser for some operations.

## 6) Layout and Navigation

### Main layout

src/Layout/MainLayout.tsx:

- Renders top navbar
- Renders sidebar
- Renders content area
- Renders mobile bottom navbar
- Controls mobile sidebar open/close state

### Top navbar

src/ProjectComponents/layout/Navbar.tsx:

- Fetches username from Firestore users/{uid}
- Fallback display order:
  1. Firestore username
  2. Firebase displayName
  3. Firebase email
- Includes mobile hamburger menu button
- Includes logout button (signOut)

### Sidebar

src/ProjectComponents/layout/Sidebar.tsx:

- Desktop: fixed left sidebar on md and up
- Mobile: slide-in drawer with overlay and close button
- Includes navigation links:
  - /
  - /search
  - /explore
  - /notifications
  - /create-post
  - /profile

### Bottom navbar

src/ProjectComponents/BottomNavbar.tsx:

- Mobile-only bottom navigation
- Links to home, explore, search, profile
- Highlights active route

## 7) Feature Pages

### Home feed

src/Pages/Home.tsx:

- Uses MainLayout
- Subscribes to posts in realtime using onSnapshot
- Sorts posts by createdAt desc
- Shows skeleton cards while loading
- Lazy-loads PostCard with Suspense
- Also renders CreatePost dialog trigger in header

### Create post page

src/Pages/CreatePost.tsx:

- Dedicated page at /create-post
- Uploads image to Cloudinary
- Saves post to Firestore with caption, imageUrl, uid, userEmail, likes, comments, createdAt
- Redirects to home on success

### Create post dialog component

src/ProjectComponents/CreatePost.tsx:

- Dialog-based create post flow used in Home header
- Also uploads to Cloudinary and writes Firestore post

Important implementation difference:

- Dialog component writes userId and Likes
- Page component writes uid and likes
  This naming mismatch can affect filtering and like logic.

### Login page

src/Pages/Login.tsx:

- Email/password login
- Google popup login
- Redirects to / on success

### Register page

src/Pages/Register.tsx:

- Email/password signup with confirm password check
- Updates Firebase displayName with username
- Creates/merges users document in Firestore
- Google signup also creates/merges users profile document

### Profile page

src/Pages/Profile.tsx:

- Loads current user profile doc from users collection
- Updates username/bio/profile image
- Uploads profile image to Cloudinary
- Fetches user posts using where(userId == uid)
- Allows deleting own posts

### Search page

src/Pages/Search.tsx:

- Fetches all users from Firestore
- Client-side filter by username
- Follow/unfollow logic using followers/following arrays
- Sends follow notifications via sendNotification helper

### Explore page

src/Pages/Explore.tsx:

- Fetches all posts
- Displays in responsive grid

### Notifications page

src/Pages/Notification.tsx:

- Fetches notifications where receiverId == current user uid
- Orders by createdAt descending
- Renders sender + message list

## 8) Shared Components

### PostCard

src/ProjectComponents/PostCard.tsx:

- Displays post image, caption, author email
- Like/unlike using arrayUnion/arrayRemove
- Add comment using arrayUnion
- Renders comments list

### PostSkeleton

src/ProjectComponents/PostSkeleton.tsx:

- Placeholder UI for loading state in home feed

## 9) Notification Helper

src/lib/sendNotification.ts:

- Utility wrapper to add documents to notifications collection
- Used by follow action in Search page
- Writes senderId, senderEmail, receiverId, type, message, createdAt

## 10) Firestore Collections Used

Based on current code:

- users
  - username, email, bio, profileImage, followers, following, createdAt
- posts
  - caption, imageUrl, uid or userId, userEmail, likes or Likes, comments, createdAt
- notifications
  - senderId, senderEmail, receiverId, type, message, createdAt

## 11) Data Flow Examples

### Register flow

1. createUserWithEmailAndPassword
2. updateProfile(displayName)
3. setDoc(users/{uid})
4. navigate to /

### Follow flow

1. Update current user following array
2. Update target user followers array
3. Create notification for target user
4. Refresh user list

### Post creation flow

1. Select image and caption
2. Upload image to Cloudinary
3. Save Firestore post doc
4. Update UI / navigate home

## 12) Styling System

- Tailwind utility classes across components
- Dark, neon-pink/red gradient visual style
- Responsive behavior with md breakpoints
- Animated mobile sidebar transitions

## 13) Scripts

From package.json:

- npm run dev
- npm run build
- npm run lint
- npm run preview

## 14) Current Technical Notes

1. There are two create-post implementations (dialog and full page) with slightly different Firestore field names.
2. Profile page queries posts by userId, but some newer post writes use uid.
3. Like field is written as Likes in one place and likes in others.

If you want, I can generate a second file that proposes a clean, unified data schema and exact refactor plan to make all modules consistent.
