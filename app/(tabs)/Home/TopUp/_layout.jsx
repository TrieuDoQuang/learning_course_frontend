import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="TopUp" options={{ headerShown: false }} />
    </Stack>
  );
};

export default StackLayout;
