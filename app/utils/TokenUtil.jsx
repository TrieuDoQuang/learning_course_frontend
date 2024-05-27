import { decode as atob, encode as btoa } from "base-64";
import { jwtDecode } from "jwt-decode";
import axios from "../api/axios";
if (!global.btoa) {
  global.btoa = btoa;
}
if (!global.atob) {
  global.atob = atob;
}

export const checkExpiredToken = (token) => {
  const decodedToken = jwtDecode(token);
  const dateNow = Date.now() / 1000;

  if (decodedToken.exp < dateNow) return true;
  else return false;
};

export const checkNearExpiredToken = (token) => {
  const decodedToken = jwtDecode(token);
  const dateNow = Date.now() / 1000;

  if (decodedToken.exp - dateNow < 60) return true;
  else return false;
};

export const refreshToken = async (refreshToken) => {
  try {
    const response = await axios.post("/api/customers/refreshToken", {
      refresh_token: refreshToken,
    });
    return response.data.result.token;
  } catch (error) {
    console.log("Couldn't refresh token: ", error);
  }
};
