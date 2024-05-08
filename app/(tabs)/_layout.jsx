import { View, Text } from "react-native";
import { Tabs, Redirect } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHome,
  faQrcode,
  faBell,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
const TabLayouts = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="Home"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center" }}>
                <FontAwesomeIcon
                  icon={faHome}
                  size={20}
                  color={focused ? "#3BBDFE" : "gray"}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="QR"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center" }}>
                <FontAwesomeIcon
                  icon={faQrcode}
                  size={20}
                  color={focused ? "#3BBDFE" : "gray"}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="Notification"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center" }}>
                <FontAwesomeIcon
                  icon={faBell}
                  size={20}
                  color={focused ? "#3BBDFE" : "gray"}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center" }}>
                <FontAwesomeIcon
                  icon={faUserAlt}
                  size={20}
                  color={focused ? "#3BBDFE" : "gray"}
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
