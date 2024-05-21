import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Link, Redirect, router } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import * as httpRequest from "../utils/httpRequest";
import { AuthContext } from "../context/AuthContext";

import { useState, useContext } from "react";
// import CheckBox from "@react-native-community/checkbox";

import { SafeAreaView } from "react-native-safe-area-context";
import images from "../assets";
const Login = () => {
  const authContext = useContext(AuthContext);
  const [auth, setAuth] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSelected, setSelection] = useState(false);
  console.log(email);
  console.log(password);
  const handleLogin = async () => {
    try {
      const response = await httpRequest.post(
        "/api/customers/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
      console.log(response.result.token);
      console.log(response.result.refresh_token);

      authContext.authenticate(response.result);
      setAuth(response.result);
      router.replace("/Home");
    } catch (error) {
      console.error("Couldn't login: ", error);
    }
  };
  return (
    <SafeAreaView className=" h-full">
      <ScrollView>
        <View className="">
          <View className="items-center">
            <Image className="w-[360px] h-[180px]" source={images.thumbnail} />
            <Image className="mt-4 mb-2" source={images.favicon} />
          </View>
          <Text className="text-center font-bold text-[28px]">
            {" "}
            Welcome back
          </Text>
          <View className="p-4 flex flex-col">
            <View className="">
              <Text className="text-[12px] mb-1">Username or Email</Text>
              <TextInput
                value={email}
                onChangeText={(prev) => {
                  setEmail(prev);
                }}
                placeholder="user@gmail.com"
                className="mb-3 h-[48px] p-2 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-400"
              />
              <Text className="text-[12px] mb-1">Password</Text>
              <TextInput
                value={password}
                onChangeText={(prev) => {
                  setPassword(prev);
                }}
                placeholder="*********"
                secureTextEntry
                className=" h-[48px] p-2 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-400"
              />
            </View>
            {/* <View className="flex flex-row gap-2">
              <CheckBox value={isSelected} onValueChange={setSelection} />{" "}
              <Text> Remember me</Text>
            </View> */}
            <View className="flex flex-row items-center justify-center mt-4">
              <View className="bg-gray-400 h-[2px] flex-1 mx-2" />
              <Text className="text-gray-400 px-4">or</Text>
              <View className="bg-gray-400 h-[2px] flex-1 mx-2" />
            </View>
            <TouchableOpacity className="items-center flex justify-center my-5  ">
              <View className="p-2 border-[1px] rounded-md bg-slate-50 border-gray-300">
                <Image source={images.faceId} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="mb-4 bg-black p-2 flex flex-row rounded-xl h-[48px] items-center  justify-center"
              onPress={() => handleLogin()}
            >
              <Text className="text-stone-50 text-center font-bold pr-2">
                Login Now
              </Text>
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

export default Login;
