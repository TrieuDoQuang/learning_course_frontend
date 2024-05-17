import { View, Text, ImageBackground } from "react-native";
import { Tabs, Redirect } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHome,
  faQrcode,
  faMoneyBillTransfer,
  faBell,
  faUserAlt,
  faShuffle,
  faArrowAltCircleDown,
  faArrowRightArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import images from "../assets";

const TabLayouts = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#1D1D25",
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            marginRight: 5,
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
                <ImageBackground source={images.transferbg} className="items-center bg-[#3BBDFE] p-[14px] rounded-[999px]">
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
