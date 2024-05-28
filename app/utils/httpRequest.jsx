import axios from "axios";

const BASE_URL = "http://192.168.1.16:8082";

const httpRequest = axios.create({
  baseURL: BASE_URL,
});

export const get = async (url, config = {}) => {
  const response = await httpRequest.get(url, config);
  return response.data;
};

export const post = async (url, data, config = {}) => {
  const response = await httpRequest.post(url, data, config);
  return response.data;
};

export const put = async (url, data, config = {}) => {
  const response = await httpRequest.put(url, data, config);
  return response.data;
};

export const del = async (url, config = {}) => {
  const response = await httpRequest.delete(url, config);
  return response.data;
};

export default httpRequest;
