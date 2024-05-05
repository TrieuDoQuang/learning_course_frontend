import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
// import CheckBox from "@react-native-community/checkbox";

import { SafeAreaView } from "react-native-safe-area-context";
const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSelected, setSelection] = useState(false);

  console.log(username);
  console.log(password);
  const handleLogin = () => {
    // Handle login logic here
  };
  return (
    <SafeAreaView className=" h-full">
      <ScrollView>
        <View className="pt-5">
          <Text className="text-center">Logo</Text>
          <Text className="text-center font-bold text-[36px]">
            {" "}
            Welcome back
          </Text>
          <View className="p-4 flex flex-col gap-2">
            <Text>Username or Email</Text>
            <TextInput
              value={username}
              onChangeText={(prev) => {
                setUsername(prev);
              }}
              placeholder="user@gmail.com"
              className=" h-[53px] p-2 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-400"
            />
            <Text>Password</Text>
            <TextInput
              value={password}
              onChangeText={(prev) => {
                setPassword(prev);
              }}
              placeholder="*********"
              secureTextEntry
              className=" h-[53px] p-2 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-400"
            />
            {/* <View className="flex flex-row gap-2">
              <CheckBox value={isSelected} onValueChange={setSelection} />{" "}
              <Text> Remember me</Text>
            </View> */}
            <View className="flex flex-row items-center justify-center">
              <View className="bg-gray-400 h-[2px] flex-1 mx-2" />
              <Text className="text-gray-400 px-4">or</Text>
              <View className="bg-gray-400 h-[2px] flex-1 mx-2" />
            </View>
            <TouchableOpacity className="bg-black p-2 flex flex-row rounded-xl h-[53px] items-center  justify-center">
              <Text className="text-white text-center font-bold pr-2">
                Login
              </Text>
              <FontAwesomeIcon
                icon={faArrowRight}
                className=" text-white"
                style={{ color: "white" }} // Set the color directly in the style attribute
              />
            </TouchableOpacity>
            <TouchableOpacity className="items-center flex justify-center">
              <Text>Face icons</Text>
            </TouchableOpacity>
            <View className="flex flex-row items-center gap-2 justify-center">
              <Text>Don't have an account?</Text>
              <Link href="/SignUp">
                <Text className="text-blue-500 font-bold">Sign up now</Text>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
