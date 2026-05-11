import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "@/Routes/ProtectedRoute";
import Home from "@/Pages/Home";
import Login from "@/Pages/Login";
import Register from "@/Pages/Register";
import Profile from "./Pages/Profile";
import CreatePostPage from "./Pages/CreatePost";

import Notifications from "./Pages/Notification";
import Search from "./Pages/Search";
import Explore from "./Pages/Explore";

const App = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/create-post" element={<CreatePostPage />} />
      </Route>
      <Route path="/search" element={<Search />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
