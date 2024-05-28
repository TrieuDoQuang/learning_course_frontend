import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

const PaymentAccountDetail = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="px-3 my-2 gap-10">
          <View>
            <View className="flex flex-row justify-between">
              <View className="flex flex-row items-center gap-2">
                <FontAwesomeIcon icon={faFileLines} size={30} />
                <View>
                  <Text>Do Quang Trieu</Text>
                  <Text>0912121212</Text>
                </View>
              </View>
              <View classNam="items-center">
                <TouchableOpacity className="items-center bg-black rounded-md p-3">
                  <Text className="font-bold  text-slate-50">
                    Set as default
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
            <View className="bg-gray-200 rounded-md">
              <View className="p-3 flex-row justify-between">
                <View className="gap-3 text-gray-300">
                  <Text>Account Name</Text>
                  <Text>Account Number</Text>
                  <Text>Account Status</Text>
                  <Text>Account Type</Text>
                  <Text>Account Opening Date</Text>
                  <Text>Account Balance</Text>
                  <Text>Reward Point</Text>
                  <Text>Banking</Text>
                </View>
                <View className="gap-3">
                  <Text className="font-bold">JOHN DOE</Text>
                  <Text className="font-bold">04152121</Text>
                  <Text className="font-bold">ACTIVE</Text>
                  <Text className="font-bold">CLASSIC</Text>
                  <Text className="font-bold">2024-04-01</Text>
                  <Text className="font-bold">0 VND</Text>
                  <Text className="font-bold">0 RWP</Text>
                  <Text className="font-bold">TDK BANKING</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentAccountDetail;
