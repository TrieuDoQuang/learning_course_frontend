import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: "",
  refreshToken: "",
  isAuthenticated: false,
  authenticate: async (token) => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  async function authenticate(result) {
    setToken(result.token);
    setRefreshToken(result.refresh_token);
    try {
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("refreshToken", refreshToken);
    } catch (error) {
      console.log("Couldn't set token to local storage: ", error);
    }
  }

  async function logout() {
    setToken("");
    setRefreshToken("");
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("refreshToken");
    } catch (error) {
      console.log("Couldn't remove token from local storage: ", error);
    }
  }

  const value = {
    token: token,
    refreshToken: refreshToken,
    isAuthenticated: !!token,
    logout,
    authenticate,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
