import React, { useEffect, useState, createContext } from "react";
import { useParams } from "react-router-dom";
import { getBusinessById } from "../services/businesses";
import CalendarLayout from "../components/Calendar/CalendarLayout";
import { useAuth } from "../auth/AuthContext";
import { getEventsByBusinessId } from "../services/events";
import { getUserRoleInBusiness } from "../services/users";
import "./BusinessProfile.scss";

const BusinessContext = createContext('business');

const BusinessProfile = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [searchDate, setSearchDate] = useState(null);
  const [business, setBusiness] = useState(null);
  const [events, setEvents] = useState([]);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    getEventList();
  }, [id, searchDate]);

  
  useEffect(() => {
    if(id && user){
      getRole();
    }
  }, [id, user])

  useEffect(() => {
    getBusinessById(id)
      ?.then((res) => {
        setBusiness(res.data.business);
      })
      .catch((e) => {
        console.error("Error fetching business data:", e);
      });
  }, [id]);

  
  useEffect(()=>{
  }, []);

  
  function getRole(){
    getUserRoleInBusiness(user?._id, id)?.then((res) => {
      setUserRole(res.data.role)
    })
    .catch((e)=>{
      console.error("Error fetching business data:", e);
    })
  }
  

  function getEventList(){
    if(searchDate === null) return;
    
    getEventsByBusinessId(id, searchDate.startDate, searchDate.endDate)
      ?.then(res => {
        setEvents(res.data.events);
      })
      .catch(e => console.log(e))
  }

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
        <BusinessContext.Provider value={{ business, user }}>
          <CalendarLayout events={events} setSearchDate={setSearchDate} submitEventCallback={getEventList} currentUserRole={userRole}/>
        </BusinessContext.Provider>
      </div>
    </main>
  );
};

export { BusinessProfile, BusinessContext };
