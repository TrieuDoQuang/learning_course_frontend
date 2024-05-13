import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser, faChevronDown } from "@fortawesome/free-solid-svg-icons";
const Transfer = () => {
  return (
    <SafeAreaView className="bg-gray-200 h-full">
      <ScrollView>
        <View>
          <View className="h-[120px] p-[9px] gap-1">
            <Text className="text-lg">Source Payment Account</Text>
            <View className="">
              <View className=" bg-white rounded-sm ">
                <View className="flex-row justify-between p-[9px] items-center">
                  <FontAwesomeIcon icon={faUser} color="orange" size={25} />
                  <View>
                    <Text>032299999 - Chau Hoang Gia Dat</Text>
                    <Text className="text-lg font-bold">150.000 VND </Text>
                  </View>
                  <TouchableOpacity>
                    <FontAwesomeIcon icon={faChevronDown} color="#3C84AB" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View className="">
            <View className="p-[9px] gap-1">
              <Text className="text-lg">To</Text>
              <View className="bg-white p-[9px] rounded-s">
                <View className="justify-center gap-1">
                  <Text className="text-sm font-bold">Account Number</Text>
                  <TextInput
                    placeholder="Enter Account Number"
                    className=" h-[53px] p-2 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-400"
                  ></TextInput>
                </View>
                <View className="mt-2">
                  <TouchableOpacity className=" h-[53px] p-2 border-2 border-gray-300 rounded-2xl justify-center bg-black ">
                    <Text className="text-center text-md font-bold text-white">
                      Confirm Transaction
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Transfer;
