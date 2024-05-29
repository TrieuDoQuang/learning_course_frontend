import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="Withdraw"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default StackLayout;
