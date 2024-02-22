import Axios from "axios";
import config from "../config";

const signUp = (params) => {
  return Axios.post(`${config.apiUrl}/auth/signup`, params);
};

const signIn = (params) => {
  return Axios.post(`${config.apiUrl}/auth/signin`, params);
};

export { signUp, signIn };
