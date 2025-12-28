
// import axios from "axios";

// export const googleAuth = (code) => {
//   return axios.get(`http://localhost:8080/auth/google?code=${code}`);
// };

import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  withCredentials: true,
});

export const googleAuth = (code) => {
  return API.get(`/api/auth/google?code=${code}`);
};
