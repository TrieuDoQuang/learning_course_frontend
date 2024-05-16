import { View, Text } from "react-native";
import { Tabs, Redirect } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHome,
  faQrcode,
  faMoneyBillTransfer,
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
              <View className="items-center">
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
              <View className="items-center">
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
          name="Transfer"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View className="items-center">
                <FontAwesomeIcon
                  icon={faMoneyBillTransfer}
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
              <View className="items-center">
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
              <View className="items-center">
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
