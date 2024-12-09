import axios from "axios";
import {config} from "../config";

const createBusiness = (params) => {
  try {
    return axios.post(`${config.apiUrl}/businesses`, params);
  } catch (e) {
    console.log(e);
  }
};

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

export { getBusinessList, getBusinessById, createBusiness };
