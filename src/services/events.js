import axios from "axios";
import config from "../config";

const createEvent = (params) => {
  try {
    return axios.post(`${config.apiUrl}/events`, params);
  } catch (e) {
    console.log(e);
  }
};

const editEvent = (params, id) => {
  try {
    return axios.put(`${config.apiUrl}/events/${id}`, params);
  } catch (e) {
    console.log(e);
  }
}

const deleteEvent = (id) => {
  try{
    return axios.delete(`${config.apiUrl}/events/${id}`);
  }catch(e){
    console.log(e);
  }
};

const getEventsByBusinessId = (id, startDate, endDate) => {
  try {
    return axios.get(`${config.apiUrl}/events/list?id=${id}&startDate=${startDate}&endDate=${endDate}`);
  } catch (e) {
    console.log(e);
  }
};

export { createEvent, editEvent, deleteEvent, getEventsByBusinessId };