import React from "react";
import { useAuth } from "../auth/AuthContext";
import MySubscriptions from "./MySubscriptions";
import BusinessList from "./BusinessList";

const StudentsHome = () => {
  const { user } = useAuth();
  return (
    <div>
      {user && <MySubscriptions />}
      {user && <BusinessList />}
    </div>
  );
};

export default StudentsHome;
