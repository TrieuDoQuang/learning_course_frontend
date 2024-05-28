import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { InputItem } from "../../components";

const Account = () => {
  return (
    <SafeAreaView className="bg-gray-200">
      <ScrollView>
        <View className="p-2 my-7 ">
          <View className="h-[107px] w-full my-5 bg-yellow-50 p-2 justify-center rounded-md ">
            <InputItem title="Your Current Password" />
          </View>
          <View className="  w-full bg-yellow-50 p-2 justify-center rounded-md ">
            <View className="mb-3 p-2 bg-blue-200  bg-opacity-20 rounded-md">
              <Text className="font-bold">
                Password must satisfy the following conditions:
              </Text>
              <View className="p-3 gap-2">
                <Text>
                  - The length of the password must be from 8 to 20 characters
                </Text>
                <Text>
                  - Contains at least 01 digit, 01 letter, 01 special character
                </Text>
              </View>
              <Text>For example: b&1A2c3d; B@123456; 12345678a*</Text>
            </View>
            <InputItem title="New Password" />
            <InputItem title="Confirm Password" />
            <TouchableOpacity
              className="mt-4 bg-black p-2 flex flex-row rounded-xl h-[48px] items-center  justify-center"
              // onPress={(e) => handleLogin(e)}
            >
              <Text className="text-stone-50 text-center font-bold pr-2">
                Change Password
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;
