import { StyleSheet, Text, View } from "react-native";
import { Slot, Stack } from "expo-router";
import React from "react";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ HeaderShow: false }}></Stack.Screen>
    </Stack>
  );
};

export default RootLayout;
