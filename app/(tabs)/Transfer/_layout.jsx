import { Stack } from "expo-router";
import images from "../../assets";
import { ImageBackground } from "react-native";

// Author: Dat
// This component is used to display the stack layout of the transfer module include Transfer and ConfirmTransaction
const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="ConfirmTransaction"
        options={{
          headerShown: true,
          headerTitle: "Confirm Transaction",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 13, color: "#fff" },
          headerTintColor: "#fff",
          headerBackground: () => (
            <ImageBackground
              source={images.bglinear}
              style={{ width: "100%", height: "100%" }}
            />
          ),
        }}
      ></Stack.Screen>
    </Stack>
  );
};

export default StackLayout;
