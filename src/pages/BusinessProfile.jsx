import React, { useEffect, useState, createContext } from "react";
import { useParams } from "react-router-dom";
import { getBusinessById } from "../services/businesses";
import { CalendarLayout } from "../components/Calendar/CalendarLayout";
import { useAuth } from "../auth/AuthContext";
import { getEventsByBusinessId } from "../services/events";
import { getUserRoleInBusiness } from "../services/users";
import "./BusinessProfile.scss";

const BusinessProfile = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [searchDate, setSearchDate] = useState(null);
  const [business, setBusiness] = useState(null);
  const [events, setEvents] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [tabNumber, setTabNumber] = useState(0)

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

  function changeTab(tabNumber){
    setTabNumber(tabNumber);
  }
  
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
      <div className="business-profile__tabs">
        <div className="business-profile__tabs--titles">
          <button onClick={()=>changeTab(0)}><h3>Calendario</h3></button>
          <button onClick={()=>changeTab(1)}><h3>Subscripciones</h3></button>
        </div>
        {tabNumber === 0 && 
          <div className="business-profile__tab-content--1">
            <div className="business-profile__calendar">
                <CalendarLayout 
                  events={events}
                  business={business}
                  setSearchDate={setSearchDate} 
                  submitEventCallback={getEventList} 
                  currentUserRole={userRole}/>
            </div>
          </div>
        }
        {tabNumber === 1 && 
          <div className="business-profile__tab.content--2">
            <div className="business-profile__subscriptions">
                <h2>Subscripciones</h2>
                <p>Coming soon...</p>
            </div>
          </div>
        }
      </div>
    </main>
  );
};

export { BusinessProfile };
