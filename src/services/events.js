import axios from "axios";
import config from "../config";

const createEvent = (params) => {
  try {
    return axios.post(`${config.apiUrl}/events`, params);
  } catch (e) {
    console.log(e);
  }
};

export { createEvent };