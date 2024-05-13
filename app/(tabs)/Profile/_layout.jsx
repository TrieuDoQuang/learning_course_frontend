import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "ProfileScreen",
        }}
      ></Stack.Screen>
    </Stack>
  );
};

export default StackLayout;
