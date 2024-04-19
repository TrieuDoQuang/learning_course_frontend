import { View, Text } from "react-native";
import { Tabs, Redirect } from "expo-router";

const TabLayouts = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen name="Home" />
      </Tabs>
    </>
  );
};

export default TabLayouts;
