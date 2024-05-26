import { decode as atob, encode as btoa } from "base-64";
import { jwtDecode } from "jwt-decode";
import * as httpRequest from "./httpRequest";
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

export const refreshToken = async (token) => {
  try {
    const response = await httpRequest.post("/api/customers/refreshToken", {
      token,
    });
    return response.data.result.token;
  } catch (error) {
    console.log("Couldn't refresh token: ", error);
  }
};
