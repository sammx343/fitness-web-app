import axios from "axios";
import config from "../config";

const createEvent = (params) => {
  try {
    return axios.post(`${config.apiUrl}/events`, params);
  } catch (e) {
    console.log(e);
  }
};

const getEventsByBusinessId = (id) => {
  try {
    return axios.get(`${config.apiUrl}/events/list?id=${id}`);
  } catch (e) {
    console.log(e);
  }
};

export { createEvent, getEventsByBusinessId };