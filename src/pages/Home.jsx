import React from "react";
import { getTeacherBusinesses } from "../services/teachers";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import MyBusinesses from "../components/MyBusinesses";
import CreateBusinessHomeSection from "../components/CreateBusinessSection";
import MySubscriptions from "../components/MySubscriptions";
import BusinessList
 from "../components/BusinessList";
const Home = () => {
  const { user } = useAuth();
  const [businessList, setBusinessList] = useState(null);
  
  useEffect(() => {
    if(user){
      getTeacherBusinesses(user._id)
      .then((res) => {
        setBusinessList(res.data.businesses);
      })
      .catch((error) => {
        console.log(error);
      });
    }
    
  }, [user]);

  return (
    <div>
      <h1> Home </h1>
      <div>
        <MySubscriptions />
        <BusinessList />
        <h1>Teachers Home</h1>
        {businessList && <MyBusinesses businessList={businessList} />}
        {businessList === null && <p>Loading...</p>}
        <CreateBusinessHomeSection />
      </div>
    </div>
  );
};

export default Home;
