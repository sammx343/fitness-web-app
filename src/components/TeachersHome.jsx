import React, { useEffect, useState } from "react";
import { getTeacherBusinesses } from "../services/teachers";
import { useAuth } from "../auth/AuthContext";
import CreateBusinessHomeSection from "./CreateBusinessSection";
import MyBusinesses from "./MyBusinesses";

const TeachersHome = () => {
  const { user } = useAuth();
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    getTeacherBusinesses(user._id)
      .then((res) => {
        console.log(res);
        setBusinessList(res.data.businesses);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user._id]);

  return (
    <div>
      <h1>Teachers Home</h1>
      <MyBusinesses businessList={businessList} />
      <CreateBusinessHomeSection />
    </div>
  );
};

export default TeachersHome;
