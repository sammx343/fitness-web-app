import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import your AuthContext

const TeachersRoute = ({ children, ...props }) => {
  const { user } = useAuth();

  return user?.role === "teacher" ? (
    children
  ) : (
    <Navigate to="/" replace state={{ from: props.location }} />
  );
};

export default TeachersRoute;
