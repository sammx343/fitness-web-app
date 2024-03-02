import axios from "axios";
import config from "../config";

const getTeacherBusinesses = (userId) => {
  try {
    return axios.get(`${config.apiUrl}/teachers/businesses?userId=${userId}`);
  } catch (e) {
    console.log(e);
  }
};

export { getTeacherBusinesses };
