import axios from "axios";
import {config} from "../config";

const createUserEvent = (params) => {
  try {
    return axios.post(`${config.apiUrl}/userevent`, params);
  } catch (e) {
    console.log(e);
  }
};

export { createUserEvent };
