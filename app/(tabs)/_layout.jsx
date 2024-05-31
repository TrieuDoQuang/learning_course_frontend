import { View, ImageBackground, Text } from "react-native";
import { Tabs, router } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHome,
  faQrcode,
  faBell,
  faUserAlt,
  faArrowRightArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import images from "../assets";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocalSearchParams } from "expo-router";

const TabLayouts = () => {
  const authContext = useContext(AuthContext);
  const { token } = authContext;
  const [isLoading, setIsLoading] = useState(true);
  const { defaultPaymentAccount } = useLocalSearchParams();

  if (!token) {
    setIsLoading(false);
    router.replace("/(auth)/Login");
  }

  if (isLoading) {
    <Text> Loading...</Text>;
  }

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#1D1D25",
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          },
          tabBarInactiveTintColor: "gray",
          tabBarActiveTintColor: "#3BBDFE",
        }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            headerShown: false,
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <View className="items-center">
                <FontAwesomeIcon
                  icon={faHome}
                  size={20}
                  color={focused ? "#3BBDFE" : "rgb(226 232 240)"}
                />
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="QR"
          options={{
            headerShown: false,
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <View className="items-center">
                <FontAwesomeIcon
                  icon={faQrcode}
                  size={20}
                  color={focused ? "#3BBDFE" : "rgb(226 232 240)"}
                />
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="Transfer"
          options={{
            headerShown: false,
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <ImageBackground
                source={images.curved}
                className="pl-[17.5px] pr-[15.5px] pt-[10px] items-center absolute top-[-25px]"
              >
                <ImageBackground
                  source={images.transferbg}
                  className="items-center bg-[#3BBDFE] p-[14px] rounded-[999px]"
                >
                  <FontAwesomeIcon
                    icon={faArrowRightArrowLeft}
                    size={23}
                    color={focused ? "#000" : "#fff"}
                  />
                </ImageBackground>
              </ImageBackground>
            ),
          }}
        />

        <Tabs.Screen
          name="Notification"
          options={{
            headerShown: false,
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <View className="items-center">
                <FontAwesomeIcon
                  icon={faBell}
                  size={20}
                  color={focused ? "#3BBDFE" : "rgb(226 232 240)"}
                />
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="Profile"
          options={{
            headerShown: false,
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <View className="items-center">
                <FontAwesomeIcon
                  icon={faUserAlt}
                  size={20}
                  color={focused ? "#3BBDFE" : "rgb(226 232 240)"}
                />
              </View>
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabLayouts;
