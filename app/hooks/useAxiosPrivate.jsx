import { useEffect, useCallback } from "react";
import { axiosPrivate } from "../api/axios";
import { refreshToken } from "../utils/TokenUtil";
import useAuth from "./useAuth";

// This hook is used to make authenticated requests to the server
const useAxiosPrivate = () => {
  const { token, setToken } = useAuth();

  const refresh = useCallback(async () => {
    try {
      const newAccessToken = await refreshToken(token);
      setToken(newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error("Failed to refresh token: ", error);
      throw error;
    }
  }, [token, setToken]);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [token, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
