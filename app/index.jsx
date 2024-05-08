import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { Redirect, router } from "expo-router";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl">Test app</Text>
      <TouchableOpacity
        onPress={() => {
          router.push("/Home");
        }}
        className="bg-blue-500 p-2 rounded-md"
      >
        <Text className="text-white">Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.push("/SignIn");
        }}
        className="bg-blue-500 p-2 rounded-md"
      >
        <Text className="text-white">Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.push("/SignUp");
        }}
        className="bg-blue-500 p-2 rounded-md"
      >
        <Text className="text-white">Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
