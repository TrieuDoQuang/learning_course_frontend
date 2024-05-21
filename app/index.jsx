import { ActivityIndicator } from "react-native";
import { Slot, Stack, useRouter } from "expo-router";
import { useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as TokenUtil from "./utils/TokenUtil";
import RootLayout from "./_layout";
import AuthContextProvider, { AuthContext } from "./context/AuthContext";

const Root = () => {
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        let storeToken = await AsyncStorage.getItem("token");
        let storeRefreshToken = await AsyncStorage.getItem("refreshToken");
        if (storeToken) {
          if (TokenUtil.checkExpiredToken(storeToken)) {
            console.log("Token expired");
            authContext.logout();
          }

          if (TokenUtil.checkNearExpiredToken(storeToken)) {
            console.log("Token near expired");
            storeToken = await TokenUtil.refreshToken(storeRefreshToken);
          }

          console.log(storeToken);
          await authContext.authenticate(storeToken);
        }
      } catch (error) {
        console.error("Couldn't fetch token: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (authContext.isAuthenticated) {
        router.replace("/App");
      } else {
        router.replace("/Login");
      }
    }
  }, [isLoading, authContext.isAuthenticated]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="grey" style={{ flex: 1 }} />;
  }

  return <RootLayout />;
};

export default function App() {
  return (
    <AuthContextProvider>
      <Root />
    </AuthContextProvider>
  );
}
