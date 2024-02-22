import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import your AuthContext

const PrivateRoute = ({ children, ...props }) => {
  const { user } = useAuth();

  return user ? (
    children
  ) : (
    <Navigate to="/" replace state={{ from: props.location }} />
  );
};

export default PrivateRoute;
