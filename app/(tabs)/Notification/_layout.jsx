import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="Notification"
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>
    </Stack>
  );
};

export default StackLayout;
