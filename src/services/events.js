import axios from "axios";
import config from "../config";

const createEvent = (params) => {
  try {
    return axios.post(`${config.apiUrl}/events`, params);
  } catch (e) {
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

export { createEvent, getEventsByBusinessId };