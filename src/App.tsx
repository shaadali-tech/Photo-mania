import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "@/Routes/ProtectedRoute";
import Home from "@/Pages/Home";
import Login from "@/Pages/Login";
import Register from "@/Pages/Register";
import Profile from "./Pages/Profile";

const App = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
