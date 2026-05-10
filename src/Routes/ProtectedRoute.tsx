import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/Context/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  // Show loading while Firebase checks user
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        Loading...
      </div>
    );
  }

  // If user exists -> allow access
  // otherwise redirect to login
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
