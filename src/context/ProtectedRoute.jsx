import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./ContextApi";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, userRole, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // ✅ Check if user is logged in and is admin
  if (!isLoggedIn || userRole !== "admin") {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
