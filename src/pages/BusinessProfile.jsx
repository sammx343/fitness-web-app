import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBusinessById } from "../services/businesses";
import CalendarLayout from "../components/CalendarLayout";
import { useAuth } from "../auth/AuthContext";

const BusinessProfile = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [business, setBusiness] = useState(null);

  useEffect(() => {
    getBusinessById(id)
      .then((res) => {
        setBusiness(res.data.business);
      })
      .catch((e) => {
        console.error("Error fetching user data:", e);
      });
  }, [id]);

  if (!business) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{business.name}</h2>
      <p>Direccion: {business.address}</p>
      <p>Email: {business.email}</p>
      <CalendarLayout />
    </div>
  );
};

export default BusinessProfile;
