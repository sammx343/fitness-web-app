import React from "react";
import BusinessList from "../components/BusinessList";
import MySubscriptions from "../components/MySubscriptions";

import { useAuth } from "../auth/AuthContext";

const Home = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1> Home </h1>
      {user && <MySubscriptions />}
      {user && <BusinessList />}
    </div>
  );
};

export default Home;
