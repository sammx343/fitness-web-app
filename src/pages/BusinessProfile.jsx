import React, { useEffect, useState, createContext } from "react";
import { useParams } from "react-router-dom";
import { getBusinessById } from "../services/businesses";
import CalendarLayout from "../components/Calendar/CalendarLayout";
import { useAuth } from "../auth/AuthContext";
import "./BusinessProfile.scss";

const BusinessContext = createContext('business');

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
    <main className="business-profile">
      <div className="business-profile__main-info">
        <h2>{business.name}</h2>
        <p>Direccion: {business.address}</p>
        <p>Email: {business.email}</p>
      </div>
      <div className="business-profile__calendar">
        <BusinessContext.Provider value={{business, user}}>
          <CalendarLayout />
        </BusinessContext.Provider>
      </div>
    </main>
  );
};

export {BusinessProfile, BusinessContext};
