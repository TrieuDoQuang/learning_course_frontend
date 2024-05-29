import { Stack } from "expo-router";
import images from "../../../assets";
import { ImageBackground } from "react-native";
const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AccountDetail"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default StackLayout;
