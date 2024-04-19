import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl">Test app</Text>
      <Link href="/Home" className="text-blue-500">
        Go to Home
      </Link>
    </View>
  );
}
