import { Stack } from "expo-router";

// Author: Dat
// This component is used to display the stack layout of the Notification module include Notification
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
