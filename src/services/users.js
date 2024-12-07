import axios from "axios";
import config from "../config";

const getUserRoleInBusiness = (userId, businessId) => {
  try {
    return axios.get(`${config.apiUrl}/students/role?userId=${userId}&&businessId=${businessId}`);
  } catch (e) {
    console.log(e);
  }
};

export { getUserRoleInBusiness };