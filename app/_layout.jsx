import { Slot, useRouter } from "expo-router";
import React, { useEffect, useState, useContext } from "react";
import * as SplashScreen from "expo-splash-screen";
import AuthContextProvider, { AuthContext } from "./context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View, Text } from "react-native"; // Import Text from react-native
import * as TokenUtil from "./utils/TokenUtil";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export { ErrorBoundary } from "expo-router";

// SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storeToken = await AsyncStorage.getItem("token");
        const storeRefreshToken = await AsyncStorage.getItem("refreshToken");

        if (storeToken) {
          if (TokenUtil.checkExpiredToken(storeToken)) {
            console.log("Token expired");
            authContext.logout();
          } else if (TokenUtil.checkNearExpiredToken(storeToken)) {
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
        SplashScreen.hideAsync();
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (authContext.isAuthenticated) {
        router.replace("/Home");
      } else {
        router.replace("/Login");
      }
    }
  }, [isLoading, authContext.isAuthenticated]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="grey" />
      </View>
    );
  }

  return <Slot />;
}

export default function App() {
  return (
    <AuthContextProvider>
      <RootLayout />
    </AuthContextProvider>
  );
}
