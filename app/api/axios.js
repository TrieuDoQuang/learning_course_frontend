import axios from "axios";

<<<<<<< HEAD
const BASE_URL = "http://172.16.31.189:8082/api";
=======
const BASE_URL = "http://192.168.1.27:8082/api";
>>>>>>> 8feec80ae0ad2615fb081775c3bfac65c2f2bcc6

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
