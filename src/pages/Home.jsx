import React from "react";
import StudentsHome from "../components/StudentsHome";
import TeachersHome from "../components/TeachersHome";
import { useAuth } from "../auth/AuthContext";

const Home = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1> Home </h1>
      {user?.role === "student" && <StudentsHome />}
      {user?.role === "teacher" && <TeachersHome />}
    </div>
  );
};

export default Home;
