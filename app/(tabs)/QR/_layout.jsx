import { Stack } from "expo-router";

// Author: Trieu
// This component is used to display the stack layout of the QR module include QR and ScanQR
const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>
    </Stack>
  );
};

export default StackLayout;
