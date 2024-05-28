import { Stack } from "expo-router";
import images from "../../../assets";
import { ImageBackground } from "react-native";
const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="PaymentAccountDetail"
        options={{
          headerShown: true,
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
      />
    </Stack>
  );
};

export default StackLayout;
