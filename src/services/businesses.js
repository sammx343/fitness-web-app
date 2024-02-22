import axios from "axios";
import config from "../config";

const getBusinessList = () => {
  try {
    return axios.get(`${config.apiUrl}/businesses/list`);
  } catch (e) {
    console.log(e);
  }
};

const getBusinessById = (id) => {
  try {
    return axios.get(`${config.apiUrl}/businesses/${id}`);
  } catch (e) {
    console.log(e);
  }
};

export { getBusinessList, getBusinessById };
